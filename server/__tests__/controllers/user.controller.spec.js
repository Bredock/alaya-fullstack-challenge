const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../../server');
const User = require('../../models/user');

describe('Controllers', () => {
  describe('User Controller', () => {
    let mongo;

    beforeAll(async () => {
      mongo = await MongoMemoryServer.create();
      const mongoUri = await mongo.getUri();

      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });

    beforeEach(async () => {
      await User.deleteMany();
    });

    afterAll(async () => {
      await mongo.stop();
      await mongoose.connection.close();
    });

    describe('Register', () => {
      it('should throw a 403 error if not email or password provided', async () => {
        const userPayload = {
          email: 'user1@testing.com',
        };

        const res = await request(app).post('/api/users/register').send({
          user: userPayload,
        });
        expect(res.statusCode).toBe(403);
      });

      it('should create the user and return the token', async () => {
        const userPayload = {
          email: 'user1@testing.com',
          password: 'password',
        };

        const res = await request(app).post('/api/users/register').send({
          user: userPayload,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();

        // Check that the user is saved on the DB
        const addedUserOnDb = await User.findOne({
          email: 'user1@testing.com',
        });
        expect(addedUserOnDb).toBeDefined();
      });
    });

    describe('Login', () => {
      it('should throw a 403 error if not email or password provided', async () => {
        const userPayload = {
          email: 'user1@testing.com',
        };

        const res = await request(app).post('/api/users/login').send({
          user: userPayload,
        });
        expect(res.statusCode).toBe(403);
      });

      it('should return the token if the user exists on the db', async () => {
        const userPayload = {
          email: 'user1@testing.com',
          password: 'password',
        };

        await request(app).post('/api/users/register').send({
          user: userPayload,
        });

        const res = await request(app).post('/api/users/login').send({
          user: userPayload,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
      });

      it('should throw a 401 error if the password provided is not valid', async () => {
        const userPayload = {
          email: 'user1@testing.com',
          password: 'password',
        };

        await request(app).post('/api/users/register').send({
          user: userPayload,
        });

        const res = await request(app).post('/api/users/login').send({
          user: {
            email: userPayload.email,
            password: 'wrongPassword',
          },
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.token).toBeUndefined();
      });
    });
  });
});
