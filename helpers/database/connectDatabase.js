const mongoose = require("mongoose");
// if something went wrong, write your mongodb url
const mongoURI = process.env.MONGODB_URI;

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDb Connection Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
