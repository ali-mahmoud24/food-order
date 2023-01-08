const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
