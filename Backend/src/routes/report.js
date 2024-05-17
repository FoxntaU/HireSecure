const express = require("express");
const router = express.Router();
const Report = require("../models/report");

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

module.exports = router;
