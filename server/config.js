module.exports = {
  db: {
    production: process.env.MONGOLAB_URI,
    development: "mongodb://localhost:27017/sessions-dev",
    test: "mongodb://localhost:27017/sessions-test",
  }
};
