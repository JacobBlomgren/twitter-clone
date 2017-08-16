import supertest from 'supertest';
import session from 'supertest-session';

import app from '../../src/server/app';
import { resetAccount, reset } from '../../src/server/db/reset';
import registerUser from '../../src/server/auth/registerUser';

const request = supertest(app);

let testSession;

beforeEach(async () => {
  testSession = session(app);
});

afterEach(async () => {
  await resetAccount();
});

afterAll(async () => {
  await reset();
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
    await registerUser('sara', 'password');
    await testSession
      .post('/api/auth/login')
      .send({ username: 'sara', password: 'password' });
    const response = await testSession
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('A user is already logged in');
  });

  it('should login a user after a successful registration', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Success');
    // contains the session cookie
    expect(response.headers['set-cookie']).not.toBeNull();
  });

  it("shouldn't accept malformed requests", async () => {
    const usernameWrongType = await request
      .post('/api/auth/register')
      .send({ username: 9, password: 'password' });
    expect(usernameWrongType.statusCode).toBe(400);

    const usernameTooLong = await request
      .post('/api/auth/register')
      .send({ username: 'aaaaaaaaaaaaaaaa', password: 'password' });
    expect(usernameTooLong.statusCode).toBe(400);

    const usernameTooShort = await request
      .post('/api/auth/register')
      .send({ username: 'aa', password: 'password' });
    expect(usernameTooShort.statusCode).toBe(400);

    const emtpyUsernameString = await request
      .post('/api/auth/register')
      .send({ username: '', password: 'password' });
    expect(emtpyUsernameString.statusCode).toBe(400);

    const omittedUsername = await request
      .post('/api/auth/register')
      .send({ password: 'password' });
    expect(omittedUsername.statusCode).toBe(400);

    const passwordTooShort = await request
      .post('/api/auth/register')
      .send({ username: 'jacob', password: 'short' });
    expect(passwordTooShort.statusCode).toBe(400);

    const omittedPassword = await request
      .post('/api/auth/register')
      .send({ username: 'jacob' });
    expect(omittedPassword.statusCode).toBe(400);
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
    await testSession
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'password' });
    const response = await testSession
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
    await testSession
      .post('/api/auth/login')
      .send({ username: 'jacob', password: 'password' });
    const response = await testSession.get('/api/auth/logout');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Success');
  });

  it("shouldn't logout a user that is not logged in", async () => {
    const response = await request.get('/api/auth/logout');

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Not logged in');
  });
});
