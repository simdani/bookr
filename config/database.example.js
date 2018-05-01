if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: '<MONGO-DB-address>'
  };
} else {
  module.exports = {
    mongoURI: '<MONGO-DB-address>'
  };
}
