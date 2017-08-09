import { QueryFile } from 'pg-promise';

export default function(filename) {
  return new QueryFile(`./server/db/queries/${filename}.sql`, {
    minify: true,
  });
}
