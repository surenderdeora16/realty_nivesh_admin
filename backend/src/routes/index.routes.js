const { licenseCheck, errorHandler, customMethods, showValidationErrors } = require('../middelwares');
const checkValid = require('../middelwares/validator');
const generalSettingsController = require('../controllers/admin/generalSettingsController');
const frontController = require('../controllers/frontController');
const express = require('express')
const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

// License Check..
router.use(customMethods);
router.use(licenseCheck);

// Admin Routes
router.get('/settings/:type', generalSettingsController.getGeneralSetting);

router.post('/contact-us', checkValid('ContactUs'), showValidationErrors, frontController.createContactUs)
router.get('/retreat-datatable/:slug?', frontController.retreatList);
router.get('/online-program-price', frontController.onlineProgramPriceList)

router.use('/user/', require('./user/index.routes'));
router.use('/admin/', require('./admin/index.routes'));

// Application Error handler 
router.use(errorHandler);

// 404 API not found
router.all("*", function (req, res) {
    res.status(404).send({ status: 404, message: "API not found", data: [] });
});

module.exports = router;