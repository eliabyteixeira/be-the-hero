const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

     async index(req, res) {

          const ongs = await connection('ongs').select('*');

          return res.json(ongs);
     },

     async create(req, res) {

          // pegar os parametros enviados na url (query params)
          // para pegar os route params utilizamos o req.params;
          // const params = req.body;
          const { name, email, whatsapp, city, uf } = req.body;
          const id = crypto.randomBytes(4).toString('HEX'); // gera um codigo aleatorio em HEXADECIMAL com 4 digitos
     
          await connection('ongs').insert({ id, name, email, whatsapp, city, uf });
     
          return res.json({ id });
     
     }
};