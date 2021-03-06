exports.up = function (knex) {
  return knex.schema.createTable("job", (table) => {
    table.increments().index().primary();

    table.string("URL").notNullable();
    table.integer("state");
    table.integer("attempt").defaultTo(0);
    table.boolean("completed").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("job");
};
