const crypto = require('crypto');

const myKey = () => crypto.randomBytes(8).toString('hex');

const validate = (request, response, next) => {
  const { email, password } = request.body;
  const emailIsValid = /\S+@\S+\.\S+/;

if (!email) { 
  return response.status(400).send({ message: 'O campo "email" é obrigatório' });
}
if (!emailIsValid.test(email)) { 
  return response.status(400).send({
    message: 'O "email" deve ter o formato "email@email.com"' });
}
if (!password) { 
  return response.status(400).send({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) { 
  return response.status(400).send({
    message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

module.exports = { validate, myKey };
