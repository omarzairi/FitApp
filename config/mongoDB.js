const mongoose=require('mongoose');
const connectDB = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://zied:xxaRn9WiPneLaCeQ@cluster0.fp7cycf.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`Error Connecting to DataBase : ${error}`);
    process.exit(1);
  }
};
module.exports=connectDB;
