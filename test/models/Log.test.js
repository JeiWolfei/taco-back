require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Log = require('../../lib/models/Log');
const { Types } = require('mongoose');

describe('Log Tests', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const log = new Log({
      place_id: '1234',
      name: 'Hot Taco',
      user: Types.ObjectId(),
      rating: { taco: 5, price: 4, vibe: 4 },
      tags: ['organic', 'dairy-free'],
      price: 3
    });
    
    expect(log.toJSON()).toEqual({
      place_id: '1234',
      name: 'Hot Taco',
      user: expect.any(Types.ObjectId),
      rating: { taco: 5, price: 4, vibe: 4 },
      tags: ['organic', 'dairy-free'],
      price: 3,
      image: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiDifGhqZHhAhXF7Z4KHZo6Av0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.hottaco.com%2F&psig=AOvVaw3Sfg0Bu5XrmiKrVm-cNlWP&ust=1553192002920323',
      _id: expect.any(Types.ObjectId)
    });
  });
});
