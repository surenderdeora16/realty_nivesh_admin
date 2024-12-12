const { decrypt, queryStringToObject } = require("../helpers/utils");
const { Booking, Retreat, DiscountCoupon } = require("../models");

const redirectUrl = process.env.REDIRECT_URL;

exports.handleSuccess = async (req, res) => {
    try {
        const responce = decrypt(req.body.encResp, process.env.WORKING_KEY);
        if (!responce) throw new Error("Something went wrong..!!");

        const responceObj = queryStringToObject(responce)
        if (Object.keys(responceObj).length === 0) throw new Error("Something went wrong..!!");

        let booking = await Booking.findById(responceObj.order_id);
        if (!booking) throw new Error("Booking not found..!!");

        if (responceObj.order_status === 'Success') {
            if (booking.type === 1) {
                const seats = booking.single_occupancy * 1 + booking.double_occupancy * 2 + booking.triple_occupancy * 3;
                await Retreat.updateOne({ _id: booking.retreat_id }, { $inc: { booked: seats } });
            }

            await booking.updateOne({ status: 1 });
            if (booking.discount_id) {
                await DiscountCoupon.updateOne({ _id: booking.discount_id, deletedAt: null }, { $inc: { used_count: 1 } });
            }

            return res.redirect(`${redirectUrl}?status=1`);
        }

        if (["Aborted", "Failure"].includes(responceObj.order_status)) {
            await booking.updateOne({ status: 2 });
            return res.redirect(`${redirectUrl}?status=2`);
        }

        return res.redirect(`${redirectUrl}?status=2`);
    } catch (error) {
        return res.redirect(`${redirectUrl}?status=2&message=${error.message}`);
    }
}

exports.handleError = async (req, res) => {
    try {
        const responce = decrypt(req.body.encResp, process.env.WORKING_KEY);
        if (!responce) throw new Error("Something went wrong..!!");

        const responceObj = queryStringToObject(responce)
        if (Object.keys(responceObj).length === 0) throw new Error("Something went wrong..!!");

        let booking = await Booking.findById(responceObj.order_id);
        if (!booking) throw new Error("Booking not found..!!");

        if (responceObj.order_status === 'Success') {
            if (booking.type === 1) {
                const seats = booking.single_occupancy * 1 + booking.double_occupancy * 2 + booking.triple_occupancy * 3;
                await Retreat.updateOne({ _id: booking.retreat_id }, { $inc: { booked: seats } });
            }

            await booking.updateOne({ status: 1 });
            if (booking.discount_id) {
                await DiscountCoupon.updateOne({ _id: booking.discount_id, deletedAt: null }, { $inc: { used_count: 1 } });
            }

            return res.redirect(`${redirectUrl}?status=1`);
        }

        if (["Aborted", "Failure"].includes(responceObj.order_status)) {
            await booking.updateOne({ status: 2 });
            return res.redirect(`${redirectUrl}?status=2`);
        }

        return res.redirect(`${redirectUrl}?status=2`);
    } catch (error) {
        return res.redirect(`${redirectUrl}?status=2&message=${error.message}`);
    }
}