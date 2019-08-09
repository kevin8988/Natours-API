const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).render('base', {
    title: 'Exciting tours for adventurous people',
    tour: 'The Forest Hiker',
    user: 'Jonas'
  });
});

router.route('/overview').get((req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours'
  });
});

router.route('/tour').get((req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  });
});

module.exports = router;
