const { ContactUs, Retreat, OnlineProgramPrice } = require('../models')

exports.createContactUs = async (req, res) => {
    try {
        let data = req.getBody(['type', 'first_name', 'last_name', 'mobile', 'email', 'message']);
        let result = await ContactUs.create(data);

        return res.successInsert(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.retreatList = async (req, res) => {
    try {
        var { slug } = req.params;
        if (slug) {
            var retreatData = await Retreat.findOne({ slug }).select('name short_description location access slug check_in check_out maximum_bookings booked image itinerary status details prices createdAt');
            if (retreatData) {

                retreatData = retreatData.toObject({ getters: true });

                retreatData.id = retreatData._id
                retreatData.check_in = retreatData.check_in.toISOString().slice(0, 10)
                retreatData.check_out = retreatData.check_out.toISOString().slice(0, 10)

                return res.success(retreatData);
            } else {
                return res.noRecords();
            }
        } else {
            var { limit, pageNo, query, orderBy, orderDirection } = req.query

            limit = limit ? parseInt(limit) : 10;
            pageNo = pageNo ? parseInt(pageNo) : 1;
            query = query || null;
            orderBy = orderBy || 'createdAt';
            orderDirection = orderDirection === '1' || orderDirection === '-1' ? parseInt(orderDirection) : -1;

            var search = { deletedAt: null }
            if (query) {
                search.$or = [
                    { name: new RegExp(query, 'i') },
                    { status: new RegExp(query, 'i') },
                    { short_description: new RegExp(query, 'i') },
                ];
            }

            var results = await Retreat
                .find(search)
                .select('name short_description location access slug check_in check_out maximum_bookings booked image itinerary status details prices createdAt')
                .limit(limit)
                .skip((pageNo - 1) * limit)
                .sort({ [orderBy]: orderDirection })

            const total_count = await Retreat.countDocuments(search);
            if (results.length > 0) {
                return res.pagination(results, total_count, limit, pageNo);
            } else {
                return res.datatableNoRecords();
            }
        }

    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.onlineProgramPriceList = async (req, res) => {
    try {
        const results = await OnlineProgramPrice.find({ deletedAt: null, status: true }, 'duration group_inr individual_inr group_usd individual_usd');
        if (results) {
            return res.success(results);
        } else {
            return res.noRecords();
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}
