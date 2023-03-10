const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const { authoriza, nameValid, ageValid, talkValid,
  rateValid } = require('./middlewares/validate');
const { validate, myKey } = require('./middlewares/login');

const app = express();
app.use(express.json());

const PORT = '3000';

const readFile = async () => {
  const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
  return JSON.parse(data);
};

const writeFile = async (content) => {
  await fs.writeFile('./src/talker.json', JSON.stringify(content));
};

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/talker', async (_request, response) => {
  const data = await readFile();
  return response.status(200).send(data);
});

app.get('/talker/:id', async (request, response) => {
  const data = await readFile();
  const { id } = request.params;
  const filterId = data.find((palestrante) => palestrante.id === Number(id));
  if (filterId) {
  return response.status(200).send(filterId);
  } 
  return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validate, async (_request, response) => {
  const token = myKey();
  return response.status(200).send({ token });
});

app.post('/talker', authoriza, nameValid, ageValid,
talkValid, rateValid, async (request, response) => {
  const { name, age, talk } = request.body;
  const data = await readFile();
  const talker = { id: data.length + 1, name, age, talk };
  data.push(talker);
  await writeFile(data);
  return response.status(201).send(talker);
});

app.put('/talker/:id', authoriza, nameValid, ageValid,
talkValid, rateValid, async (request, response) => {
    const { name, age, talk } = request.body;
    const data = await readFile();
    const { id } = request.params;
    const talker = data.findIndex((talkers) => talkers.id === Number(id));
    data[talker] = { ...data[talker], name, age, talk };
    await writeFile(data);
    return response.status(200).send(data[talker]);
});

app.delete('/talker/:id', authoriza, async (request, response) => {
  const data = await readFile();
  const { id } = request.params;
  const talker = data.findIndex((talkers) => talkers.id === Number(id));
  data.splice(talker, 1);
  await writeFile(data);
  return response.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
