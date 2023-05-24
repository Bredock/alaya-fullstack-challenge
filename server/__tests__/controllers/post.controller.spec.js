const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../../server');
const Post = require('../../models/post');

describe('Controllers', () => {
  describe('User Controller', () => {
    let mongo;
    const posts = [];
    let user1;

    beforeAll(async () => {
      mongo = await MongoMemoryServer.create();
      const mongoUri = await mongo.getUri();

      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      user1 = await request(app)
        .post('/api/users/register')
        .send({
          user: {
            email: 'user1@testing.com',
            password: 'password',
          },
        });
    });

    beforeEach(async () => {
      const post1 = new Post({
        name: 'Post 1',
        title: 'Title 1',
        content: 'Content 1',
        slug: 'Slug 1',
        cuid: 'cuid1',
        user: user1.body.user.cuid,
        dateAdded: new Date(),
      });
      await post1.save();
      posts.push(post1);

      const post2 = new Post({
        name: 'Post 2',
        title: 'Title 2',
        content: 'Content 2',
        slug: 'Slug 2',
        cuid: 'cuid2',
        user: 'user2',
        dateAdded: new Date(),
      });
      await post2.save();
      posts.push(post2);
    });

    afterEach(async () => {
      await Post.deleteMany();
    });

    afterAll(async () => {
      await mongo.stop();
      await mongoose.connection.close();
    });

    describe('getPosts', () => {
      it('should get the posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.posts.length).toEqual(posts.length);
      });
    });

    describe('addPost', () => {
      it('should add the post if the token is provided', async () => {
        const postPayload = {
          title: 'Added Post',
          name: 'Add post',
          content: 'Some content',
        };

        const res = await request(app)
          .post('/api/posts')
          .send({
            post: postPayload,
          })
          .set('Authorization', user1.body.token);
        expect(res.statusCode).toBe(200);
        expect(res.body.post.title).toBe('Added Post');

        // Check that the post is saved on the DB
        const addedPostOnDb = await Post.findOne({ title: 'Added Post' });
        expect(addedPostOnDb.name).toBe('Add post');
      });

      it('should throw a 403 error if name, title or content missing', async () => {
        const postPayload = {
          title: 'Added Post',
          name: 'Add post',
        };

        const res = await request(app)
          .post('/api/posts')
          .send({
            post: postPayload,
          })
          .set('Authorization', user1.body.token);
        expect(res.statusCode).toBe(403);
      });

      it('should throw a 401 error if no token provided', async () => {
        const postPayload = {
          title: 'Added Post',
          name: 'Add post',
          content: 'Some content',
        };

        const res = await request(app).post('/api/posts').send({
          post: postPayload,
        });
        expect(res.statusCode).toBe(401);
      });
    });

    describe('getPost', () => {
      it('should return the post', async () => {
        const res = await request(app).get(`/api/posts/${posts[0].cuid}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.post.cuid).toEqual(posts[0].cuid);
      });

      it('should return null when not found', async () => {
        const res = await request(app).get('/api/posts/cuid3');

        expect(res.statusCode).toBe(200);
        expect(res.body.post).toBe(null);
      });
    });

    describe('deletePost', () => {
      it('should delete the post if token from the owner user provided', async () => {
        const res = await request(app)
          .delete(`/api/posts/${posts[0].cuid}`)
          .set('Authorization', user1.body.token);

        expect(res.statusCode).toBe(200);

        // Check that the post is deleted from the DB
        const addedPostOnDb = await Post.findOne({ cuid: posts[0].cuid });
        expect(addedPostOnDb).toBe(null);
      });

      it('should not delete the post if token provided is from different user than the owner', async () => {
        const res = await request(app)
          .delete(`/api/posts/${posts[1].cuid}`)
          .set('Authorization', user1.body.token);

        expect(res.statusCode).toBe(401);

        // Check that the post is not deleted from the DB
        const addedPostOnDb = await Post.findOne({ cuid: posts[1].cuid });
        expect(addedPostOnDb).not.toBe(null);
      });

      it('should send a 404 error if post not found', async () => {
        const res = await request(app)
          .delete('/api/posts/cuid3')
          .set('Authorization', user1.body.token);

        expect(res.statusCode).toBe(404);
      });

      it('should send a 401 error if no token provided', async () => {
        const res = await request(app).delete(`/api/posts/${posts[1].cuid}`);

        expect(res.statusCode).toBe(401);
      });
    });
  });
});
