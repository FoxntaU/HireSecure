const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();

// register user
router.post("/users/create", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.post("/users/get", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  userSchema
    .findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// login user
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Enviamos el token de autenticación al cliente
    // Este token se debe enviar en cada petición que requiera autenticación para cada ruta a la que se quiera restringir el acceso
    const token = jwt.sign({ id : user._id }, 'secreto', { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
