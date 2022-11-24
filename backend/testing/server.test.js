
const request = require('supertest');
const app = require('../dist/testApp');
const server = 'http://localhost:8081';

const UserSchema = require('../dist/models/schemas/user-schema');

describe('Comment Routes', () => {

  test('POST / createNewComment - should return status 200', async () => {
    const res = await request(server).post('/comments/').send({
      comment: 'comment',
      idUser: 1,
      idPost: 1,
    });
    expect(res.statusCode).toBe(201);
    console.log(res.body);
  });

  test('GET / retrieveCommentByPost', async () => {
    const res = await request(server).get('/comments/1');
    expect(res.statusCode).toBe(200);
  });
});

describe('Main routes', () => {
  test('GET /listPosts', async () => {
    const res = await request(server).get('/listPosts/');
    expect(res.statusCode).toBe(200);

  })
})

describe('Post routes', () => {

  test('GET ', async () => {
    const res = await request(server).get('/posts/d@test.com');
    expect(res.statusCode).toBe(200);
  })
  test('GET', async () => {
    const res = await request(server).get('/posts/single-post/1');
    expect(res.statusCode).toBe(200);
  })

  test('POST / PATCH / DELETE', async () => {
    const res = await request(server).post('/posts/')
      .set("Content-Type", "multipart/form-data")
      .field("title", "post")
      .field("description", "description")
      .field("userEmail", "d@test.com")
      .field("price", "10")
      .attach(
        "postPicture",
        "./testing/IMG_0979.JPG"
      )
    expect(res.statusCode).toBe(201);
    const postId =  res.body.id;

    //PATCH
    const res2 = await request(server).patch(`/posts/update-post/${postId}`);
    expect(res2.statusCode).toBe(200);

    //DELETE
    const res3 = await request(server).delete(`/posts/delete-post/${postId}`);
    expect(res3.statusCode).toBe(200);
  })
})

describe('User Routes', () => {
  afterEach( async () => {await UserSchema.default.destroy({where:{email:"hello2@gmail.com"}})})

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
