const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    vacancy: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    expirationTime: {
        type: String,
        required: true
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h'
    }
});

module.exports = mongoose.model('Token', tokenSchema);
