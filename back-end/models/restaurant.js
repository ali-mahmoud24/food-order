const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
      // required: false,
    },
  ],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
