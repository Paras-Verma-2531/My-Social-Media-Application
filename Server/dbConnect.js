const mongoose = require("mongoose");
async function connectDb() {
  const MongoUri = process.env.MONGOURI; // fetch the Uri from env file:
  //use the connect function to connect to the MongoDB Atlas
  try {
    await mongoose.connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    process.exit(1); //exit the server if no connection is established with database
  }
}
module.exports = connectDb;
