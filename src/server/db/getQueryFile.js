import { QueryFile } from 'pg-promise';
import path from 'path';

export default function(filename) {
  return new QueryFile(
    path.resolve(__dirname, `../../../src/server/db/queries/${filename}.sql`),
    {
      minify: true,
    },
  );
}
