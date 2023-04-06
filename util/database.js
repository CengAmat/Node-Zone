const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://ametzurnaci:J2Dy3jl6yGxy1P6o@cluster0.iipdgc3.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("Connected!");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
