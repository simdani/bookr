if (process.env.NODE_ENV === 'production') {
  module.exports = require('./database_prod');
} else {
  module.exports = require('./database_dev');
}
