const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ongController = require('./controllers/ongs-controllers');
const incidentsController = require('./controllers/incidents-controller');
const profileControllers = require('./controllers/profile-controller');
const sessionsControllers = require('./controllers/sessions-controller');
const routes = express.Router(); // desacoplando o modulo de rotas do expess para um nova variavel



routes.post('/sessions', sessionsControllers.create);
routes.get('/ongs', ongController.index);


// validacoes do corpo da requisicao
routes.post('/ongs', celebrate({
     [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.string().required().min(10).max(11),
          city: Joi.string().required(),
          uf: Joi.string().required().length(2)
     })
}), ongController.create);


// validacao do envio do id da page na listagem de incidents (mobile)
routes.get('/incidents', celebrate({
     [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required
     })
}), incidentsController.index);


// valida se enviou o header com o id da ong, e os campos obrigatorios do body
routes.post('/incidents', celebrate({
     [Segments.BODY]: Joi.object().keys({
          title: Joi.string().required(),
          description: Joi.string().required(),
          value: Joi.number().required(),
     }),
     [Segments.HEADERS]: Joi.object({
          authorization: Joi.string().required()
     }).unknown()
}), incidentsController.create);

// validacao do envio do id no momento que for deletar um incident
routes.delete('/incidents/:id', celebrate({
     [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required()
     })
}), incidentsController.delete);


/* 
valida o recebimento do header com o id de authorization da ong
o unknow() é para aceitar outros headers que a requisicao por padrao manda.
*/
routes.get('/profile', celebrate({
     [Segments.HEADERS]: Joi.object({
          authorization: Joi.string().required()
     }).unknown()
}), profileControllers.index);

// exporta o modulo de rotas para ser importado pelo index.
module.exports = routes; 
