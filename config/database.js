if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://testas:testas@ds159509.mlab.com:59509/bookr-dev'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://testas:testas@ds159509.mlab.com:59509/bookr-dev'
  };
}
