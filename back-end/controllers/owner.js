const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const dayjs = require('dayjs');

const { HttpError } = require('../models/http-error');

const Product = require('../models/product');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');

exports.getSingleRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;

  let restaurant;
  try {
    console.log({ restaurantId });
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

exports.addResaturant = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { ownerId, name, address, category, image } = req.body;

  const newRestaurant = new Restaurant({
    ownerId,
    name,
    address,
    category,
    image: req.file.path,
  });

  try {
    await newRestaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Creating restaurant failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: 'Restaurant created!',
    restaurantId: newRestaurant._id.toString(),
  });
};

exports.updateRestaurant = async (req, res, next) => {
  const { name, address, category } = req.body;
  const { restaurantId } = req.params;

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find restaurant.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError('Could not find restaurant for this id.', 404);
    return next(error);
  }

  if (name) {
    restaurant.name = name;
  }
  if (address) {
    restaurant.address = address;
  }
  if (category) {
    restaurant.category = category;
  }

  try {
    await restaurant.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ restaurant: restaurant.toObject({ getters: true }) });
};

// exports.deleteDoctor = async (req, res, next) => {
//   const { doctorId } = req.params;

//   let doctor;
//   try {
//     doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
//     res.status(200).json({ message: 'Deleted a doctor.' });
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete doctor.',
//       500
//     );
//     return next(error);
//   }
// };

exports.getAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({}).populate('doctorId');
  } catch (err) {
    const error = new HttpError(
      'Fetching appointments failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!appointments || appointments.length === 0) {
  //   return next(new HttpError('Could not find appointments.', 404));
  // }

  res.json({
    appointments: appointments.map((appointment) => {
      const appointmentSeralized = appointment.toObject({ getters: true });
      const appointmentDateTime = dayjs(appointmentSeralized.time);

      return {
        ...appointmentSeralized,
        date: appointmentDateTime.format('DD/MM/YYYY'),
        time: appointmentDateTime.format('h:mm A'),
      };
    }),
  });
};

exports.addProductToRestaurant = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(HttpError);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, price } = req.body;
  const { restaurantId } = req.params;

  console.log(restaurantId);

  const newProduct = new Product({
    restaurantId,
    title,
    description,
    price,
    image: req.file.path,
  });

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    const error = new HttpError(
      'Creating product failed, please try again.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError('Could not find restaurant.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newProduct.save({ session: sess });
    restaurant.products.push(newProduct);
    await restaurant.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating product failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: 'product created!',
    productId: newProduct._id,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;

  let product;
  try {
    product = await Product.findById(productId);
    res.json({ product: product.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find product.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { title, description, price } = req.body;
  const { productId } = req.params;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find product.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  if (title) {
    product.title = title;
  }
  if (description) {
    product.description = description;
  }
  if (price) {
    product.price = price;
  }

  try {
    await product.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

exports.deleteProductFromRestaurant = async (req, res, next) => {
  const { productId } = req.params;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  let restaurant;
  try {
    restaurant = await Restaurant.findById(product.restaurantId);
  } catch (err) {
    const error = new HttpError(
      'Deleting product failed, please try again.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError(
      'Could not find restaurant with this product.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    restaurant.products.pull(product);
    await product.remove({ session: sess });
    await restaurant.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted product.' });
};
