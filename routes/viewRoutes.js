const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.getOverview);

router.route('/tours/:tourSlug').get(viewController.getTour);

router.route('/login').get(viewController.login);

module.exports = router;
