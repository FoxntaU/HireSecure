const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Token = require("../models/token"); 


router.post('/codes/generate', async (req, res) => {
    const { subject, generatedBy, isSingleUse, expirationDate } = req.body;

    const expiresIn = Math.floor((new Date(expirationDate) - Date.now()) / 1000);
    let token;
    if (isSingleUse)   {
        token = jwt.sign({ subject, generatedBy, isSingleUse, expirationDate}, 'secreto');
    } else {
        token = jwt.sign({ subject, generatedBy, isSingleUse, expirationDate}, 'secreto', { expiresIn });
    }

    try {
        const newToken = new Token({ token });
        await newToken.save();

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el token' });
    }
});


router.post('/codes/verify', async (req, res) => {
    const { token } = req.body;

    try {
        const existingToken = await Token.findOneAndDelete({ token });

        if (!existingToken) {
            throw new Error('Token inválido');
        }

        const decoded = jwt.verify(token, 'secreto');
        const { subject, generatedBy, isSingleUse, expirationDate, used } = decoded;
        res.json({ subject, generatedBy, isSingleUse, expirationDate, used });
        
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
});

module.exports = router;
