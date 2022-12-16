const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const { authoriza, nameValid, ageValid, watchedAtValid,
  rateValid, talkValid } = require('./middlewares/validate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_OK201_STATUS = 201;
const HTTP_ERR404_STATUS = 404;
const HTTP_ERR400_STATUS = 400;
const PORT = '3000';
const myKey = () => crypto.randomBytes(8).toString('hex');

const readFile = async () => {
  const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
  return JSON.parse(data);
};

const validate = (request, response, next) => {
  const { email, password } = request.body;
  const emailIsValid = /\S+@\S+\.\S+/;

if (!email) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "email" é obrigatório' });
}
if (!emailIsValid.test(email)) { 
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'O "email" deve ter o formato "email@email.com"' });
}
if (!password) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) { 
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await readFile();
  return response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', async (request, response) => {
  const data = await readFile();
  const { id } = request.params;
  const filterId = data.find((palestrante) => palestrante.id === Number(id));
  if (filterId) {
  return response.status(HTTP_OK_STATUS).send(filterId);
  } 
  return response.status(HTTP_ERR404_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validate, async (_request, response) => {
  const token = myKey();
  return response.status(HTTP_OK_STATUS).send({ token });
});

app.post('/talker', authoriza, nameValid, ageValid, watchedAtValid,
rateValid, talkValid, async (request, response) => {
  const { name, age, talk } = request.body;
  const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
  const talker = { id: data.length + 1, name, age, talk };
  data.push(talker);
  fs.writeFile('src/talker.json', data);
  return response.status(HTTP_OK201_STATUS).send(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
