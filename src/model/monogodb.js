const mongoose = require("mongoose");
const config = require("../config/baseConfig");

const options = {
  useNewUrlParser: true,
};

mongoose.connect(config.database, options);

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connection open to ${config.database}`);
});

mongoose.connection.on("error", err => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
