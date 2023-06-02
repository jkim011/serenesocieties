const mongoose = require('mongoose');
// require ('dotenv/config');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/serene_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB connected!"))
.catch(err => console.log(err));

module.exports = mongoose.connection;