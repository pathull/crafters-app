
const supertest = require('supertest');
const app = require('../dist/server/server.js');

const server = supertest.agent(app);

function loginUser() {
  return function(done) {
    server
    .post('./')
    .send({ user: 'd@test.com', password: 'TESTtest123!' })
    .end(function(err, res) {
      if (err) return done(err);
      return done();
    })
  }
}

describe('test', () => {

  test('login', loginUser())
  test('GET ./ should return status 200', async () => {
    const res = await server.get('./');
    expect(res.status).toEqual(200);
  });

});

