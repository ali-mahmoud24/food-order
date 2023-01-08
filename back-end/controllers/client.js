const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const dayjs = require('dayjs');

const { HttpError } = require('../models/http-error');

const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const User = require('../models/user');

exports.getRestaurants = async (req, res, next) => {
  let restaurants;
  try {
    restaurants = await Restaurant.find({});
    // console.log(restaurants);
  } catch (err) {
    const error = new HttpError(
      'Fetching restaurants failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!restaurants || restaurants.length === 0) {
    return next(new HttpError('Could not find restaurants.', 404));
  }

  res.json({
    restaurants: restaurants.map((restaurant) =>
      restaurant.toObject({ getters: true })
    ),
  });
};

exports.getRestaurantMenu = async (req, res, next) => {
  const { restaurantId } = req.body;

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    const error = new HttpError(
      'Fetching restaurant failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    return next(new HttpError('Could not find restaurant.', 404));
  }

  res.json({
    restaurant: restaurant.toObject({ getters: true }),
  });
};

exports.addOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(HttpError);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { userId, restaurantId, address, time, orderItems } = req.body;

  const newOrder = new Order({
    userId,
    restaurantId,
    address,
    time,
    orderItems,
  });

  // console.log(req.userData);
  // console.log(userId);

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Creating appointment failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newOrder.save({ session: sess });
    user.orders.push(newOrder);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating appointment failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: 'Order created!',
    orderId: newOrder._id,
  });
};

exports.getClientOrders = async (req, res, next) => {
  const { userId } = req.userData;

  let orders;
  try {
    orders = await Order.find({ userId: userId });
    // .populate(
    //   'doctorId'
    // );
  } catch (err) {
    const error = new HttpError(
      'Fetching orders failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!appointments || appointments.length === 0) {
  //   return next(new HttpError('Could not find appointments.', 404));
  // }

  res.json({
    orders: orders.map((order) => {
      const orderSeralized = order.toObject({ getters: true });
      const orderDateTime = dayjs(orderSeralized.time);

      return {
        ...orderSeralized,
        date: orderDateTime.format('DD/MM/YYYY'),
        time: orderDateTime.format('h:mm A'),
      };
    }),
  });
};
