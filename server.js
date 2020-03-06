const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config({
  path: './.env',
});

// Very cheap and naive db
const users = [];

const app = express();

app.set('view-engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'Bob' });
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.post('/login', (req, res) => {});

app.listen(PORT, () =>
  console.log(`Server running on ${process.env.PORT} port`),
);
