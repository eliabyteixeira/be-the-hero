const knex = require('knex');

const config = require('../../knexfile');

const connection = knex(config.development); // estmaos utilizando a config de dev

module.exports = connection;