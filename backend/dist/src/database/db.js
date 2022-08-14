"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = 'mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.sdcycqk.mongodb.net/MovieDB';
const client = new mongodb_1.MongoClient(uri, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
}
//  err => {
//  if (!err) {
//      console.log('Database connection successed');
//  } else {
//      console.log('Error in connection ' + err);
//  }
//  }
);
client.connect();
console.log('Database connection successful');
exports.default = client;
