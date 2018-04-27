const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Load routes
const books = require('./routes/books');
const users = require('./routes/users');

// passport config
require('./config/passport')(passport);

// Db config
const db = require('./config/database');

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
});

// Bodyparser middeware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Method Override middleware
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
  secret: 'keyboard cat secret top',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middeware
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

// Routes
app.use('/books', books);
app.use('/users', users);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
