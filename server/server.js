import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import router from './routes/root.js';

const app = express();
const PORT = process.env.PORT || 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', router)

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

app.listen(PORT, () => {
  console.log(`TakeNotes app running on port ${PORT}`);
})

