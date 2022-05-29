const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    email: {
        type: String,
        required: true,
        max:255,
        min:10
    },
    password: {
        type: String,
        required: true,
        max:1024,
        min:8
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);