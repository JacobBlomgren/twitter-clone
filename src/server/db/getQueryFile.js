import { QueryFile } from 'pg-promise';
import path from 'path';

/**
 * Returns a {@link https://vitaly-t.github.io/pg-promise/QueryFile.html|QueryFile}
 * from a filepath.
 *
 * @example
 * getQueryFile('user/get_user')
 * @param filepath -
 *  the filepath to the query file relative to the src/server/db/queries directory,
 *  with the sql extension omitted.
 */
export default function(filepath) {
  return new QueryFile(
    path.resolve(__dirname, `../../../src/server/db/queries/${filepath}.sql`),
    {
      minify: true,
    },
  );
}
