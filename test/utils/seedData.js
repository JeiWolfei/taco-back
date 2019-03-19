const Log = require('../../lib/models/Log');
const User = require('../../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_LOGS = 10;

module.exports = ({ totalUsers = DEFAULT_TOTAL_USERS, totalLogs = DEFAULT_TOTAL_LOGS }) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({ email: `seed${i}@test.com`, password: 'password', zipcode: `972${i}1` }))
  )
    .then(users => {
      return Promise.all(
        [...Array(totalLogs)].map(() => {
          return Log.create({
            place_id: chance.string(),
            name: chance.pickone(['Dos Tacos Locos', 'Taco Mamma', 'Mighty Taco', 'Taco Treasure', 'Tiny Taco']),
            user: chance.pickone(users)._id,
            rating: { 
              taco: chance.integer({ min: 1, max: 5 }),
              price: chance.integer({ min: 1, max: 5 }),
              vibe: chance.integer({ min: 1, max: 5 }),
            },
            tags: chance.pickone(['organic', 'gluten-free', 'dairy-free', 'vegan', 'mexican', 'authentic', 'bean', 'tofu']),
            price: chance.integer({ min: 0, max: 3 })
          });
        })
      );
    });
};

