const request = require('supertest');
const app = require('../dist/testApp');
const server = 'http://localhost:8081';
// test('should return status 200', async () => {
//   console.log(app);
//   const res = await request(server).get('/');

//   expect(res.statusCode).toBe(200);

// });

describe('User', () => {

  test('POST /should post new user', async () => {
    const res = await request(server).post('/user/').send({
      email: "hello2@gmail.com",
      bio: "my bio",
      username: "patrick",
      name: 'code legend',
      userPicUrl: "https://res.cloudinary.com/dovw0n8pd/image/upload/v1668788539/knittingApp/posts/aektblsljswdavahgafj.jpg",
      public_picture_id: "https://res.cloudinary.com/dovw0n8pd/image/upload/v1668788539/knittingApp/posts/aektblsljswdavahgafj.jpg",
    })
    expect(res.statusCode).toBe(201);
  });

});

