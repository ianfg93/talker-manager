const HTTP_ERR401_STATUS = 401;
const HTTP_ERR400_STATUS = 400;

const authoriza = (request, response, next) => {
  const { authorization } = request.headers;

if (!authorization) { 
  return response.status(HTTP_ERR401_STATUS).send({ message: 'Token não encontrado' });
}
if (!authorization.length < 16 || typeof authorization !== 'string') {
  return response.status(HTTP_ERR401_STATUS).send({
    message: 'Token inválido' });
}
next();
};

const nameValid = (request, response, next) => {
  const { name } = request.body;

if (!name) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "name" é obrigatório' });
}
if (!name.length < 3) {
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'O "name" deve ter pelo menos 3 caracteres' });
}
next();
};

const ageValid = (request, response, next) => {
  const { age } = request.body;

if (!age) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "age" é obrigatório' });
}
if (!age < 18) {
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'A pessoa palestrante deve ser maior de idade' });
}
next();
};

const talkValid = (request, response, next) => {
  const { talk } = request.body;

if (!talk) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "talk" é obrigatório' });
}
next();
};

const watchedAtValid = (request, response, next) => {
  const { watchedAt } = request.body;
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

if (!watchedAt) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "watchedAt" é obrigatório' });
}
if (!patternData.test(watchedAt)) {
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
next();
};

const rateValid = (request, response, next) => {
  const { rate } = request.body;

if (!rate) { 
  return response.status(HTTP_ERR400_STATUS).send({ message: 'O campo "rate" é obrigatório' });
}
if (rate < 1 || rate > 5) {
  return response.status(HTTP_ERR400_STATUS).send({
    message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};

module.exports = {
  authoriza,
  nameValid,
  ageValid,
  watchedAtValid,
  rateValid,
  talkValid,
};
