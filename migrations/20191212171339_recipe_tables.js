
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable()
  })
  .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('recipe_name', 255)
      .notNullable()
      tbl.string('recipe_description', 255)
      .nullable()
  })
  .createTable('recipe_instructions', tbl => {
      tbl.increments();
      tbl.integer('instructions_number').notNullable()
      tbl.string('instructions').notNullable()
      tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  })
  .createTable('recipe_instruction_ingredients', tbl => {
    tbl.primary(['ingredient_id', 'step_number', 'recipe_id'])
    tbl.integer("ingredient_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("ingredients");
    tbl.string('quantity').notNullable()
    tbl.integer('step_number')
    .unsigned()
    .notNullable()
    .references('instructions_number')
    .inTable('recipe_instructions')
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    tbl.integer('recipe_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('recipes')
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("recipe_instruction_ingredients")
    .dropTableIfExists("recipe_instructions")
    .dropTableIfExists("ingredients")
};
