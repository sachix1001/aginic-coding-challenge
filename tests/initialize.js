const knex = require("../server/knex");

const ignoreError = () => {
  // do nothing
};

const clearTable = (tableName) => knex(tableName).del().catch(ignoreError);

const tables = ["job"];

Promise.all(tables.map(clearTable)).then(process.exit);
