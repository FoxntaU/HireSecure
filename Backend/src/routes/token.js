const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Token = require("../models/token"); 


function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
}
  

router.post('/codes/generate', async (req, res) => {
    const { company, vacancy, medium, subject, expirationDate, expirationTime, generatedBy } = req.body;
    
    let token;
    let isUnique = false;
    while (!isUnique) {
        token = generateToken(6);
        const existingToken = await Token.findOne({ token });
        if (!existingToken) {
            isUnique = true;
        }
    }

    if (!company || !vacancy || !medium || !subject || !expirationDate || !expirationTime || !generatedBy) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const decodedToken = jwt.verify(generatedBy, 'secreto');
        const userId = decodedToken.id; 

        const newToken = new Token({ token, company, vacancy, medium, subject, expirationDate, expirationTime, generatedBy: userId });
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
