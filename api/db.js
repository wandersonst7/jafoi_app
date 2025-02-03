require("dotenv").config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@jafoiappcluster.hvjvl.mongodb.net/?retryWrites=true&w=majority&appName=JaFoiAppCluster`);
    
    console.log("Conectou ao banco!")
  } catch (error) {
    console.log(error)
  }
}

module.exports = conn;