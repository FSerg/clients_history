module.exports = {
  port: process.env.PORT || 5002,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
  resultsCounts: process.env.RESULTS_COUNTS || 100
};
