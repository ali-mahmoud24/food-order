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

router.get('/restaurant/:restaurantId', ownerController.getSingleRestaurant);

router.patch('/restaurant/:restaurantId', ownerController.updateRestaurant);

router.post(
  '/restaurant/:restaurantId/add-product',
  fileUpload.single('image'),
  ownerController.addProductToRestaurant
);

router.get(
  '/restaurant/:restaurantId/:productId',
  ownerController.getSingleProduct
);

router.patch(
  '/restaurant/:restaurantId/:productId',
  ownerController.updateProduct
);

router.delete(
  '/restaurant/:restaurantId/:productId',
  ownerController.deleteProductFromRestaurant
);

module.exports = router;
