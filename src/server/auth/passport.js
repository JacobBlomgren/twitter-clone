import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { getUserByIDAuth, getUserByUsernameAuth } from '../db/queries/user';

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByIDAuth(id);
    done(null, { username: user.username, id: user.id });
  } catch (err) {
    done(err, null);
  }
});

// Checks a password against the password from the database.
async function checkPassword(username, password, done) {
  try {
    const user = await getUserByUsernameAuth(username);

    if (user === null) {
      return done(null, false, { message: 'Username does not exist.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.hash);

    if (passwordMatches) {
      return done(null, { username: user.username, id: user.id });
    }
    return done(null, false, { message: 'Incorrect password.' });
  } catch (err) {
    return done(err);
  }
}

passport.use(new LocalStrategy({}, checkPassword));

export default passport;
