const express = require('express');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./views/helpers');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure server to serve up static assets in the "public" directory
app.use('/static', express.static('public'));

// Start: setup handlebars template engine
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts/',
  partialsDir: './views/includes/',
  helpers: {
    if_equal: hbsHelpers.isEqualHelper
  }
}));

app.set('view engine', 'hbs');
// End: setup handlebars template engine

// home route (http://localhost:5000)
app.get('/', (req, res) => {
  res.render('index');
});

// music route (http://localhost:5000/music)
app.get('/music', (req, res) => {
  res.render('music');
});

// search route (http://localhost:5000/search)
app.get('/search', (req, res) => {
  res.render('search');
});

// profile route (http://localhost:5000/profile)
app.get('/profile', (req, res) => {
  res.render('profile');
});

// playlists route (http://localhost:5000/playlists)
app.get('/playlists', (req, res) => {
  res.render('playlists');
});

// 404 route
app.use((req, res, next) => {
  const err = new Error(`The requested URL ${req.originalUrl} was not found on this server.  That's all we know.`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).render('error', { err });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});