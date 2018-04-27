const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Load routes
const books = require('./routes/books');

// Routes
app.use('/books', books);

app.use('/', (req, res) => {
  res.render('home/index');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
