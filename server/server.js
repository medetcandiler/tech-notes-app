const express = require('express');
const cors = require('cors')
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const path = require('path');
const staticRoute = require('./routes/root');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

const app = express();
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', staticRoute)

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Nor Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TechNotes app running on port ${PORT}`);
})

