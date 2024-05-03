const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
    },
    phoneNumber: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    jobIds : {
        type: Array,
    }
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
