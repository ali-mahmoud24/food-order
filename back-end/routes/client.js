const express = require('express');

const clientController = require('../controllers/client');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/restaurants', clientController.getRestaurants);

router.get('/restaurants/:restaurantId', clientController.getRestaurantMenu);

router.post('/restaurants/:restaurantId/add-order', clientController.addOrder);

router.get('/orders', clientController.getClientOrders);

module.exports = router;
