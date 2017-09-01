import { QueryFile } from 'pg-promise';
import path from 'path';

export default function(filename) {
  return new QueryFile(path.resolve(__dirname, `./queries/${filename}.sql`), {
    minify: true,
  });
}
