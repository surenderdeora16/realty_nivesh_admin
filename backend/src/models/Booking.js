const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2]  // 1 => Retreat   // 2 => Online Program 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    // ---------------- Retreats Start --------------------------
    retreat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "retreats",
    },
    single_occupancy: {
        type: Number,
        required: true,
        default: 0
    },
    double_occupancy: {
        type: Number,
        required: true,
        default: 0
    },
    triple_occupancy: {
        type: Number,
        required: true,
        default: 0
    },
    // ---------------- Retreats End --------------------------

    // ---------------- Online Programs Start --------------------------
    slot_id: {
        type: Number,
        required: true,
        default: 0,
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "onlineprogramprices",
        default: null,
    },
    user_plan: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2]  // 1 => Individual 2 => Group
    },
    // ----------------Online Programs End -----------------

    currency: {
        type: Number,
        required: false,
    },
    discount_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "discountcoupons",
        default: null,
    },
    sub_total: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
});

module.exports = mongoose.model('Booking', Schema);