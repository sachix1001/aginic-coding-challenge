exports.up = function (knex) {
  console.log("creating");
  return knex.schema.createTable("job", (table) => {
    table.increments().index().primary();

    table.string("URL").notNullable();
    table.string("state");
    table.integer("attempt").defaultTo(0);
    table.boolean("complete").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("job");
};
