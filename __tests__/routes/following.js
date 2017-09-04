import session from 'supertest-session';

import app from '../../src/server/app';
import { resetFollows } from '../../src/server/db/reset';
import { getUserByUsernameAuth } from '../../src/server/db/queries/user';
import { follow } from '../../src/server/db/queries/follow';
import registerUser from '../../src/server/auth/registerUser';

let user1 = {};
let user2 = {};
let request;

beforeAll(async () => {
  await registerUser('following1', 'password');
  await registerUser('following2', 'password');

  // we need the user id
  user1 = await getUserByUsernameAuth('following1');
  console.log(user1);
  user2 = await getUserByUsernameAuth('following2');
});

beforeEach(async () => {
  request = session(app);
  await resetFollows();
});

function loginUser1() {
  return request
    .post('/api/auth/login')
    .send({ username: 'following1', password: 'password' });
}

describe('POST /api/following', () => {
  it('should follow a user', async () => {
    await loginUser1();
    const response = await request
      .post('/api/following')
      .send({ user_id: user2.id });

    expect(response.statusCode).toBe(200);
  });

  it("shouldn't follow an already followed user", async () => {
    await loginUser1();
    await request.post('/api/following').send({ user_id: user2.id });
    const response = await request
      .post('/api/following')
      .send({ user_id: user2.id });

    expect(response.statusCode).toBe(500);
  });

  it("shouldn't be possible to follow yourself", async () => {
    await loginUser1();
    const response = await request
      .post('/api/following')
      .send({ user_id: user1.id });

    expect(response.statusCode).toBe(400);
  });

  it("shouldn't be possible to send a malformed follow request", async () => {
    await loginUser1();
    const [responseString, responseNegative, responseOmitted] = await Promise.all([
      request.post('/api/following').send({ user_id: 'asdfg' }),
      request.post('/api/following').send({ user_id: '-100' }),
      request.post('/api/following').send({}),
    ]);

    expect(responseString.statusCode).toBe(400);
    expect(responseNegative.statusCode).toBe(400);
    expect(responseOmitted.statusCode).toBe(400);
  });

  it('cannot follow when not logged in', async () => {
    const response = await request
      .post('/api/following')
      .send({ user_id: user1.id });

    expect(response.statusCode).toBe(401);
  });
});

describe('DELETE /api/following', () => {
  it('should unfollow a user', async () => {
    await loginUser1();
    await follow(user1.id, user2.id);
    const response = await request
      .delete('/api/following')
      .send({ user_id: user2.id });

    expect(response.statusCode).toBe(204);
  });

  it("shouldn't be possible to unfollow yourself", async () => {
    await loginUser1();
    const response = await request
      .delete('/api/following')
      .send({ user_id: user1.id });

    expect(response.statusCode).toBe(400);
  });

  it('cannot unfollow when not logged in', async () => {
    const response = await request
      .delete('/api/following')
      .send({ user_id: user1.id });

    expect(response.statusCode).toBe(401);
  });
});
