const mongoose = require("mongoose");
const uri =
    "mongodb+srv://tanish522:tanish522@stocktracker.zw3tre7.mongodb.net/?retryWrites=true&w=majority";

// function to connect our server with our db
async function connect() {
    try {
        const db = await mongoose.connect(uri);
        console.log("connected to mongoose");
    } catch (error) {
        console.log(error);
    }
}

connect();
