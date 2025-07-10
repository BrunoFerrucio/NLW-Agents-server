import { reset, seed } from 'drizzle-seed';
import { schema } from './schema/index.ts';
import { db, sql } from './connection.ts';

await reset(db, schema);

await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum()
      }
    },
    questions: {
      count: 20,
    }
  }
})

await sql.end();