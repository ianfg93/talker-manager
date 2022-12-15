const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';
const myKey = () => crypto.randomBytes(8).toString('hex');

const readFile = async () => {
  const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
  return JSON.parse(data);
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
  return response.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (_request, response) => {
  const token = myKey();
  return response.status(HTTP_OK_STATUS).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
