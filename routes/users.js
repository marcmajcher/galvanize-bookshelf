'use strict';

/* eslint-disable max-len */
/* eslint-disable camelcase */

const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', (req, res) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      const user = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashedPassword
      };

      knex('users').insert(user)
        .returning(['id', 'first_name', 'last_name', 'email'])
        .then((users) => {
          res.send({
            id: users[0].id,
            email: users[0].email,
            firstName: users[0].first_name,
            lastName: users[0].last_name
          });
        });
    });
});

module.exports = router;

// POST	/users	{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }	200	{ id: 2, "first_name": "John", "last_name": "Siracusa", ... }
