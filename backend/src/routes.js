const express = require('express');

const ongController = require('./controllers/ongs-controllers');
const incidentsController = require('./controllers/incidents-controller');
const profileControllers = require('./controllers/profile-controller');
const sessionsControllers = require('./controllers/sessions-controller');

const routes = express.Router(); // desacoplando o modulo de rotas do expess para um nova variavel

routes.post('/sessions', sessionsControllers.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

routes.get('/profile', profileControllers.index);

// exporta o modulo de rotas para ser importado pelo index.
module.exports = routes; 
