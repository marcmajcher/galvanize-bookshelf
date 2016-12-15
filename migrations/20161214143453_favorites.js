'use strict';

/* eslint-disable max-len */

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.integer('book_id').unsigned().references('books.id').notNullable().onDelete('CASCADE');
    table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE');
  });
};

exports.down = knex => knex.schema.dropTable('favorites');

/*
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         favorites                                               │
├────────────────┬─────────────────────────┬──────────────────────────────────────────────────────┤
│id              │serial                   │primary key                                           │
│book_id         │integer                  │not null references books(id) on delete cascade index │
|user_id         │integer                  │not null references users(id) on delete cascade index │
│created_at      │timestamp with time zone │not null default now()                                │
│updated_at      │timestamp with time zone │not null default now()                                │
└────────────────┴─────────────────────────┴──────────────────────────────────────────────────────┘
*/
