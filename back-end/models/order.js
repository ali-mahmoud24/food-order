const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  address: { type: String, required: true },

  time: {
    type: Date,
    required: true,
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],

  status: { type: String, enum: ['Preparing', 'Delivering', 'Delivered'] },
});

module.exports = mongoose.model('Order', orderSchema);
