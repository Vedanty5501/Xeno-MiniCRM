// const { MongoClient } = require('mongodb');

// const uri = 

// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// async function connectDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB!');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// module.exports = { connectDatabase, client };



import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

const connect = async() => {
    const connectionState = mongoose.connection.readyState;
     if(connectionState == 1) {
        console.log("Already Connected");
        return;
     }
     if(connectionState == 2) {
        console.log("connecting.....");
        return;
     }
      try{
        mongoose.connect(MONGODB_URI,{
            dbName: "CustomerManagment",
            bufferCommands: false
        })
        console.log("Connected to DB");
      }
      catch (error){
        console.log("connecting with database",error);
      }
}

export default connect;