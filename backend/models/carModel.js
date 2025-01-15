const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    images: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
