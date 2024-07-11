module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

// when calling, input function needs to declare all (req, res, next) due to next(err)
