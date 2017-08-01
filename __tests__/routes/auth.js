import supertest from 'supertest';
import passportStub from 'passport-stub';

import app from '../../src/server/app';
import db from '../../src/server/db/connection';
import registerUser from '../../src/server/auth/registerUser';

const request = supertest(app);
passportStub.install(app);

beforeEach(() => {
  db.any('DELETE FROM account');
});

afterEach(() => {
  passportStub.logout();
});

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Success');
  });

  it("shouldn't register an already registered user", async () => {
    await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(500);
  });

  it("should't register a new user if another is already logged in", async () => {
    passportStub.login({ username: 'sara', password: 'password' });
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('A user is already logged in');
  });
});

describe('POST api/auth/login', () => {
  it('should login a user', async () => {
    await registerUser('jacob', 'password');
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'password' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Success');
  });

  it('should reject a user with the wrong password', async () => {
    await registerUser('jacob', 'password');
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'wrongpass' });

    expect(response.statusCode).toBe(401);
  });

  it("shouldn't log in an already logged in user", async () => {
    await registerUser('jacob', 'password');
    passportStub.login({ username: 'jacob', password: 'password' });
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('A user is already logged in');
  });

  it("shouldn't login an unregistered user", async () => {
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(401);
  });
});

describe('GET api/auth/logout', () => {
  it('should logout a logged in user', async () => {
    await registerUser('jacob', 'password');
    passportStub.login({ username: 'jacob', password: 'password' });
    const response = await request.get('/api/auth/logout');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Success');
  });

  it("shouldn't logout a user that is not logged in", async () => {
    const response = await request.get('/api/auth/logout');

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Not logged in');
  });
});
