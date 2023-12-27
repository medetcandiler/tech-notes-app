const express = require('express')
const path = require('path');

const staticRoute = express.Router();

staticRoute.get('^/$|/index(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = staticRoute;