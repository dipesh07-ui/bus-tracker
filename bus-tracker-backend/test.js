
import assert from 'assert';
import db from './sqlite-db.js';

function testDatabaseConnection() {
  console.log('Running database connection test...');
  db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="buses"', (err, row) => {
    if (err) {
      console.error('Error querying database:', err.message);
      assert.fail('Database query failed');
    } else if (row) {
      console.log('Database connection test passed.');
      assert.ok(true, 'Database connection test passed');
    } else {
      console.error('"buses" table not found.');
      assert.fail('"buses" table not found');
    }
  });
}

testDatabaseConnection();
