'use strict';

const express = require('express');
const knex = require('../knex');

/* eslint-disable max-len */
/* eslint-disable id-length */

// eslint-disable-next-line new-cap
const router = express.Router();

// GET	/books	N/A	200	[{ id: 1, "title": "JavaScript, The Good Parts", ... }, ...]
router.get('/books', (req, res) => {
  knex('books').then((books) => {
    res.send(books.sort((a, b) => {
      return a.title > b.title;
    }));
  });
});

// GET	/books/1	N/A	200	{ id: 1, "title": "JavaScript, The Good Parts", ... }
router.get('/books/:id', (req, res) => {
  knex('books').where('id', req.params.id).first().then((book) => {
    res.send(book);
  });
});

// POST	/books	{ "title": "You Don't Know JS: Types & Grammar", ... }	200	{ id: 9, "title": "You Don't Know JS: Types & Grammar", ... }
router.post('/books', (req, res) => {
  knex('books').insert(req.body)
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url']).then((books) => {
      res.send(books[0]);
    });
});

// PATCH	/books/9	{ description: "Looks at type coercion problems." }	200	{ id: 9, ..., description: "Looks at type coercion problems.", ... }
router.patch('/books/:id', (req, res) => {
  knex('books').where('id', req.params.id).update(req.body)
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url']).then((books) => {
      res.send(books[0]);
    });
});

// DELETE	/books/9	N/A	200	{ "title": "You Don't Know JS: Types & Grammar", ... }
router.delete('/books/:id', (req, res) => {
  knex('books').where('id', req.params.id).first().then((book) => {
    knex('books').where('id', req.params.id).del().then(() => {
      delete book.id;
      res.send(book);
    });
  });
});

module.exports = router;
