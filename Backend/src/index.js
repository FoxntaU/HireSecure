// codigo del servidor
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const tokenRoutes = require('./routes/token');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes)
app.use('/api', tokenRoutes)

// Conexion a la base de datos
mongoose.connect(process.env.mongodb_uri)
.then(() => { console.log('Connected to database') })
.catch((err) => { console.log('Error connecting to database', err) });

app.listen(port, () => console.log('Server running on port', port));


