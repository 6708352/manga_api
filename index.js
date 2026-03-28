const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mangaRoutes = require('./routes/mangas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Manga API running' });
});

app.use('/mangas', mangaRoutes);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(3333, () => {
    console.log('Server running on port 3333');
  });
}