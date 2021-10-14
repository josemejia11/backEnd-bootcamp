const environment = require("./index");
const mongoose = require("mongoose");

mongoose.connect(environment.mongodbUrl);
