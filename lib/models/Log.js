const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: [true, 'place_id required']
  },
  name: {
    type: String,
    required: [true, 'place name required']
  },
  user: {
    type: mongoose.Types.ObjectId, ref: 'User',
    required: [true, 'user required']
  },
  rating: {
    taco: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    price: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    vibe: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: tags => tags.length > 0,
      message: () => 'at least one tag required'
    }
  },
  price: {
    type: Number,
    min: 0,
    max: 3,
    required: [true, 'price required 0-3']
  },
  image: {
    type: String,
    required: [true, 'at least one image required per taco place']
  }

}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

const groupByRating = () => ({ $match: { 'rating.price': { $gte: 1 } } });
const sortByDesc = () => ({ $sort: { 'rating.price': -1 } });
const limitBy3 = () => ({ $limit: 3 });

logSchema.statics.getBestPrice = function() {
  return this.aggregate([
    groupByRating(),
    sortByDesc(),
    limitBy3(),
  ]);
};

module.exports = mongoose.model('Log', logSchema);
