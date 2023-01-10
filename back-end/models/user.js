const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  secondName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  isOwner: {
    type: Boolean,
    default: false,
    required: true,
  },

  restaurantId: {
    type: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: false },
  },
});

module.exports = mongoose.model('User', userSchema);
