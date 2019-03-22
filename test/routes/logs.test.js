const { getUser, getToken, getLog } = require('../../test/utils/dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('Logs tests', () => {
  it('creates a log', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/logs')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            place_id: '1234',
            name: 'Mighty Taco',
            tags:['dairy-free', 'organic'],
            price: 2,
            rating: { taco: 3, price: 3, vibe: 3 },
            user: user._id,
            image: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj809v70Y7hAhWOqZ4KHRZaB7gQjRx6BAgBEAU&url=https%3A%2F%2Fpdx.eater.com%2Fmaps%2Fbest-tacos-portland-map&psig=AOvVaw28HvlFseUFcceudno5PUJL&ust=1553099847046895',
          })
          .then(res => {
            expect(res.body).toEqual({
              place_id: '1234',
              name: 'Mighty Taaco',
              tags: ['dairy-free', 'organic'],
              price: 2,
              rating: { taco: 3, price: 3, vibe: 3 },
              _id: expect.any(String),
              user: expect.any(String),
              image: expect.any(String)
            });
          });
      });
  });

  it('gets all logs', () => {
    return request(app)
      .get('/logs')
      .set('Authorization', `Bearer ${getToken()}`)
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });
  
  it('gets a log by id', () => {
    return getLog()
      .then(log => {
        return Promise.all([
          Promise.resolve(log),
          request(app)
            .get(`/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
        ]);
      })
      /* eslint-disable-next-line */
      .then(([log, res]) => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: expect.any(Object),
          rating: expect.any(Object),
          tags: expect.any(Array),
          price: expect.any(Number),
          image: expect.any(String)
        });
      });
  });

  it('updates a log by id', () => {
    return getLog()
      .then(log => {
        return request(app)
          .patch(`/logs/${log._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ name: log.name }); 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: expect.any(Object),
          rating: expect.any(Object),
          tags: expect.any(Array),
          price: expect.any(Number),
          image: expect.any(String)
        });
      });
  });

  it('deletes a log', () => {
    return getLog()
      .then(log => {
        return Promise.all([
          Promise.resolve(log._id),
          request(app)
            .delete(`/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
        ]);
      })
      .then(([log, res]) => {
        console.log('Log', log);
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
