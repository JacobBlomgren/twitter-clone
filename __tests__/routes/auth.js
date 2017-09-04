import supertest from 'supertest';
import session from 'supertest-session';

import app from '../../src/server/app';
import registerUser from '../../src/server/auth/registerUser';
import { db } from '../../src/server/db/connection';

const request = supertest(app);

let testSession;

beforeEach(async () => {
  testSession = session(app);
});

afterEach(async () => {
  db.none("DELETE FROM account WHERE username ~ 'auth'");
});

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Success');
  });

  it("shouldn't register an already registered user", async () => {
    await request
      .post('/api/auth/register')
      .send({ username: 'auth', password: 'password' });
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(500);
  });

  it("should't register a new user if another is already logged in", async () => {
    await registerUser('auth1', 'password');
    await testSession
      .post('/api/auth/login')
      .send({ username: 'auth1', password: 'password' });
    const response = await testSession
      .post('/api/auth/register')
      .send({ username: 'auth2', password: 'password' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('A user is already logged in');
  });

  it('should login a user after a successful registration', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Success');
    // contains the session cookie
    expect(response.headers['set-cookie']).not.toBeNull();
  });

  it("shouldn't accept malformed requests", async () => {
    const [
      usernameWrongType,
      usernameTooLong,
      usernameTooShort,
      emtpyUsernameString,
      omittedUsername,
      passwordTooShort,
      omittedPassword,
    ] = await Promise.all([
      request
        .post('/api/auth/register')
        .send({ username: 9, password: 'password' }),
      request
        .post('/api/auth/register')
        .send({ username: 'aaaaaaaaaaaaaaaa', password: 'password' }),
      request
        .post('/api/auth/register')
        .send({ username: 'aa', password: 'password' }),
      request
        .post('/api/auth/register')
        .send({ username: '', password: 'password' }),
      request.post('/api/auth/register').send({ password: 'password' }),
      request
        .post('/api/auth/register')
        .send({ username: 'auth', password: 'short' }),
      request.post('/api/auth/register').send({ username: 'auth' }),
    ]);

    expect(usernameWrongType.statusCode).toBe(400);
    expect(usernameTooLong.statusCode).toBe(400);
    expect(usernameTooShort.statusCode).toBe(400);
    expect(emtpyUsernameString.statusCode).toBe(400);
    expect(omittedUsername.statusCode).toBe(400);
    expect(passwordTooShort.statusCode).toBe(400);
    expect(omittedPassword.statusCode).toBe(400);
  });
});

describe('POST api/auth/login', () => {
  it('should login a user', async () => {
    await registerUser('auth', 'password');
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Success');
  });

  it('should reject a user with the wrong password', async () => {
    await registerUser('auth', 'password');
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'wrongpass' });

    expect(response.statusCode).toBe(401);
  });

  it("shouldn't log in an already logged in user", async () => {
    await registerUser('auth', 'password');
    await testSession
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'password' });
    const response = await testSession
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('A user is already logged in');
  });

  it("shouldn't login an unregistered user", async () => {
    const response = await request
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'password' });

    expect(response.statusCode).toBe(401);
  });
});

describe('GET api/auth/logout', () => {
  it('should logout a logged in user', async () => {
    await registerUser('auth', 'password');
    await testSession
      .post('/api/auth/login')
      .send({ username: 'auth', password: 'password' });
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
