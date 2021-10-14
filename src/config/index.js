const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const environment = {
  port: process.env.VP_PORT,
  mongodbUrl: process.env.VP_MONGODB_URL,
  publicFolder: path.join(__dirname, "../../public"),
  uploadFilesFolder: path.join(__dirname, "../../public/uploads"),
};

module.exports = environment;
