import '../src/server/env';
import { db } from '../src/server/db/connection';

db
  .none('DELETE FROM tweet; DELETE FROM follows; DELETE FROM account;')
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
