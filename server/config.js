module.exports = {
  db: {
    production: "mongodb://heroku_jktj79c9:t7bg9rqid896acev3gv15i5hs1@ds047325.mongolab.com:47325/heroku_jktj79c9",
    development: process.env.MONGO_URL,
    test: process.env.MONGO_URL
  }
};
