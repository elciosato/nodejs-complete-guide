const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://eysato:Lm343TokLipciwE3@cluster0.1sozrij.mongodb.net/shopDB?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("MongoDB Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found!";
};

module.exports = { mongoConnect, getDb };
