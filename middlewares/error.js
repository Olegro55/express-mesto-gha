const error = (err, req, res) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports = error;
