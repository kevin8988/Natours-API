const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(viewController.getOverview);

router.route('/tours/:tourSlug').get(authController.protect, viewController.getTour);

router.route('/login').get(viewController.getLoginForm);

module.exports = router;
