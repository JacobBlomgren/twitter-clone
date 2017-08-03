import session from 'supertest-session';

import app from '../../src/server/app';
import { resetFollows, reset } from '../../src/server/db/reset';
import { getUserByUsername } from '../../src/server/db/queries/user';
import { follow } from '../../src/server/db/queries/follow';
import registerUser from '../../src/server/auth/registerUser';

let sara = {};
let jacob = {};
let request;

beforeAll(async () => {
  await registerUser('jacob', 'password');
  await registerUser('sara', 'password');

  // we need the user id
  sara = await getUserByUsername('sara');
  jacob = await getUserByUsername('jacob');
});

beforeEach(async () => {
  request = session(app);
  await resetFollows();
});

afterAll(async () => {
  await reset();
});

function login() {
  return request
    .post('/api/auth/login')
    .send({ username: 'jacob', password: 'password' });
}

describe('POST /api/following', () => {
  it('should follow a user', async () => {
    await login();
    const response = await request
      .post('/api/following')
      .send({ user_id: sara.id });

    expect(response.statusCode).toBe(200);
  });

  it("shouldn't follow an already followed user", async () => {
    await login();
    await request.post('/api/following').send({ user_id: sara.id });
    const response = await request
      .post('/api/following')
      .send({ user_id: sara.id });

    expect(response.statusCode).toBe(500);
  });

  it("shouldn't be possible to follow yourself", async () => {
    await login();
    const response = await request
      .post('/api/following')
      .send({ user_id: jacob.id });

    expect(response.statusCode).toBe(400);
  });

  it("shouldn't be possible to send a malformed follow request", async () => {
    await login();
    const response = await request
      .post('/api/following')
      .send({ user_id: 'asdfg' });

    expect(response.statusCode).toBe(400);
  });

  it('cannot follow when not logged in', async () => {
    const response = await request
      .post('/api/following')
      .send({ user_id: jacob.id });

    expect(response.statusCode).toBe(401);
  });
});

describe('DELETE /api/following', () => {
  it('should unfollow a user', async () => {
    await login();
    await follow(jacob.id, sara.id);
    const response = await request
      .delete('/api/following')
      .send({ user_id: sara.id });

    expect(response.statusCode).toBe(204);
  });

  it("shouldn't be possible to unfollow yourself", async () => {
    await login();
    const response = await request
      .delete('/api/following')
      .send({ user_id: jacob.id });

    expect(response.statusCode).toBe(400);
  });

  it('cannot unfollow when not logged in', async () => {
    const response = await request
      .delete('/api/following')
      .send({ user_id: jacob.id });

    expect(response.statusCode).toBe(401);
  });
});
