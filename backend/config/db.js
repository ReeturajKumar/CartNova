const mongooses = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongooses.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;