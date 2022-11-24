
const request = require('supertest');
const app = require('../dist/testApp');
const server = 'http://localhost:8081';


describe(' POST / createNewComment', () => {

  test('should return status 200', async () => {
    console.log(app);
    const res = await request(server).get('/listPosts/');

    expect(res.statusCode).toBe(200);

  });

  test('bad test', () => {
    expect(true).toBe(true);
  })

});

