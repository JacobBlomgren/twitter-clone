import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { getUserByID, getUserByUsername } from '../db/queries';

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByID(id);
    done(null, user.id);
  } catch (err) {
    done(err, null);
  }
});

async function checkPassword(username, password, done) {
  try {
    const user = await getUserByUsername(username);
    const passwordMatches = await bcrypt.compare(password, user.hash);

    if (passwordMatches) {
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect password.' });
  } catch (err) {
    return done(err);
  }
}

passport.use(new LocalStrategy({}, checkPassword));

export default passport;
