const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    short_description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    access: {
        type: String,
        required: true,
    },
    check_in: {
        type: Date,
        required: true,
    },
    itinerary: {
        type: String,
        required: true,
        get: (value) => `${process.env.BASEURL}/uploads/retreat/${value}`
    },
    image: {
        type: String,
        required: true,
        get: (value) => `${process.env.BASEURL}/uploads/retreat/${value}`
    },
    check_out: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    prices: [{
        occupancy_type: { type: Number, required: true, enum: [1, 2, 3] },
        currency: { type: Number, required: true, enum: [1, 2] },
        amount: { type: Number, required: true, },
    }],
    status: {
        type: Number,
        default: true
    },
    maximum_bookings: {
        type: Number,
        default: 0,
        required: true
    },
    booked: {
        type: Number,
        required: true,
        default: 0
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


module.exports = mongoose.model('Retreat', Schema);