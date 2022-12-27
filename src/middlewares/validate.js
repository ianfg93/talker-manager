const authoriza = (request, response, next) => {
    const { authorization } = request.headers;
  
  if (!authorization) { 
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return response.status(401).json({
      message: 'Token inválido' });
  }
  next();
  };

const nameValid = (request, response, next) => {
  const { name } = request.body;

if (!name) { 
  return response.status(400).json({ message: 'O campo "name" é obrigatório' });
}
if (name.length < 3) {
  return response.status(400).json({
    message: 'O "name" deve ter pelo menos 3 caracteres' });
}
next();
};

const ageValid = (request, response, next) => {
  const { age } = request.body;

if (!age) { 
  return response.status(400).json({ message: 'O campo "age" é obrigatório' });
}
if (Number(age) < 18) {
  return response.status(400).json({
    message: 'A pessoa palestrante deve ser maior de idade' });
}
next();
};

const talkValid = (request, response, next) => {
  const { talk } = request.body;
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

    if (!talk) {
        return response.status(400).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
  const { watchedAt } = request.body.talk;
    if (!watchedAt) {
  return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!patternData.test(watchedAt)) {
        return response.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const rateValid = (request, response, next) => {
  const { rate } = request.body.talk;

if (rate === undefined) { 
  return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
}
if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
  return response.status(400).json({
    message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};

module.exports = {
    authoriza,
    nameValid,
    ageValid,
    talkValid,
    rateValid,
};
