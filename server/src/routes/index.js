const fs = require('fs');
const path = require('path');
const { Router } = require('express');

// Every file in this folder becomes /api/<file-name>
const router = Router();

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== 'index.js')
  .sort()
  .forEach((file) => {
    router.use(`/${path.basename(file, '.js')}`, require(path.join(__dirname, file)));
  });

module.exports = router;
