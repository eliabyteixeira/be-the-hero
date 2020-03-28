// importando o express pra dentro da variavel express
const express = require('express'); 
const cors = require('cors');
const routes = require('./routes'); // o ./ para identificar que e um arquivo e nao um pacote

// instancia a aplicacao
const app = express();

// protege a aplicacao de quem pode acessar ou
app.use(cors({
     origin: 'http://192.168.0.101'
}));

// antes de todas as rotas, faz o express converter o corpo da requisicao para json
// faz a aplicacao entender que todas as requisicoes que vierem com body
app.use(express.json());
// essa funcao recebe uma outra funcao com dois parametros um de request e outro de response, chamando a rota principal '/' quando o usuario acessar essa rota
// o servidor vai retornar uma resposta com o que estiver dentro do trecho da funcao 

// usa as rotas importadas do arquivo ./routes
app.use(routes);

// a aplicacao vai ouvir na porta 3333
app.listen(3333);
