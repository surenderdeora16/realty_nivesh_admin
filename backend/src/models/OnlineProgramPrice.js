const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    duration: {
        type: String,
        required: true,
        default: 0,
    },
    group_inr: {
        type: Number,
        required: true,
        default: 0,
    },
    individual_inr: {
        type: Number,
        required: true,
        default: 0,
    },
    group_usd: {
        type: Number,
        required: true,
        default: 0,
    },
    individual_usd: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
});


module.exports = mongoose.model('OnlineProgramPrice', Schema);