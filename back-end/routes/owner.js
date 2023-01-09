const express = require('express');

const ownerController = require('../controllers/owner');

const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// router.use(checkAuth);

router.post(
  '/add-restaurant',
  fileUpload.single('image'),
  ownerController.addResaturant
);

router.get('/restaurants/:restaurantId', ownerController.getSingleRestaurant);

router.patch('/restaurants/:restaurantId', ownerController.updateRestaurant);

router.post(
  '/restaurants/:restaurantId/add-product',
  fileUpload.single('image'),
  ownerController.addProductToRestaurant
);

router.get(
  '/restaurants/:restaurantId/:productId',
  ownerController.getSingleProduct
);

router.patch(
  '/restaurants/:restaurantId/:productId',
  ownerController.updateProduct
);

router.delete(
  '/restaurants/:restaurantId/:productId',
  ownerController.deleteProductFromRestaurant
);

module.exports = router;
