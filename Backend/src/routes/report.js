const express = require("express");
const router = express.Router();
const Report = require("../models/report");
const report = require("../models/report");

router.post("/report", async (req, res) => {
  const { platform, description, assets, createdBy } = req.body;

  if (!platform || !description || !assets || !createdBy) {
    return res.status(400).json({
      message: "Faltan algunos de los campos requeridos",
    });
  }

  try {
    const report = new Report({
      assets,
      platform,
      description,
      createdBy,
      createdAt: new Date(),
      verified: false,
    });

    await report.save();

    res.json({ report });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal, por favor intenta de nuevo",
    });
  }
});

router.get("/report/unverified", async (req, res) => {
  try {
    const unverifiedReports = await report.find({
      verified: false,
    });

    res.json({
      reports: unverifiedReports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal, intentalo de nuevo",
    });
  }
});

router.get("/report/verified", async (req, res) => {
  try {
    const unverifiedReports = await report.find({
      verified: true,
    });

    res.json({
      reports: unverifiedReports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal, intentalo de nuevo",
    });
  }
});

router.post("/report/verify", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Faltan algunos de los campos requeridos",
    });
  }

  try {
    Report.findByIdAndUpdate(id, {
      verified: true,
    })
      .then(() => {
        res.status(200).json({
          message: "Actualizado",
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Algo salio mal, intentalo de nuevo",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal, por favor intenta de nuevo",
    });
  }
});

router.delete("/report", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Faltan algunos de los campos requeridos",
    });
  }

  try {
    Report.findByIdAndDelete(id, {
      verified: true,
    })
      .then(() => {
        res.status(200).json({
          message: "Elminiado correctamente",
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Algo salio mal, intentalo de nuevo",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal, por favor intenta de nuevo",
    });
  }
});


module.exports = router;
