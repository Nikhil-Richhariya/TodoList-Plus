import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

const dbConnect = async () => {
  // check already connected
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    // console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Succesfully");
  } catch (error) {
    console.log("Database Connection failed ", error);
    process.exit(1);
  }
};

export default dbConnect;
