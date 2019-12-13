exports.seed = function(knex, Promise) {
    return knex('recipes').insert([
      { username: 'water', recipe: 'h2o' },
      { username: 'hot water', recipe: 'h2o that has been heated' },
      { username: 'lukewarm water', recipe: 'h2o that has sat out'  },
    ]);
  };