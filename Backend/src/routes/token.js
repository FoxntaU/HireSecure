const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Token = require("../models/token"); 


router.post('/codes/generate', async (req, res) => {
    const { vacancy, generatedBy, contactMethod } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    if (!vacancy || !generatedBy || !contactMethod) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const newToken = new Token({ token, vacancy, generatedBy, contactMethod });
        await newToken.save();

        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al guardar el token' });
    }
});


router.get('/codes/verify', async (req, res) => {
    const { token } = req.body;

    if(!token) {
        return res.status(400).json({ message: 'Token es requerido' });
    }

    try {
        const existingToken = await Token.findOneAndDelete({ token });

        if (!existingToken) {
            res.status(404).json({ message: 'Token no encontrado' });
        }

        await Token.deleteOne({ token });

        res.json({ vacancy: existingToken.vacancy, generatedBy: existingToken.generatedBy, contactMethod: existingToken.contactMethod });

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token inválido' });
    }
});

module.exports = router;
