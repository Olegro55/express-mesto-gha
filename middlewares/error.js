const error = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return next();
  }

  res.status(500).send({ message: 'На сервере произошла ошибка' });
  return next();
};

module.exports = error;
