module.exports = function logger(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    if (process.env.NODE_ENV === 'test') return;
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`);
  });
  next();
};
