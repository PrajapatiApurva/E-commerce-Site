import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
// import dotenv to use environment variables because we will be storing our database connection string and PORT number in an environment variable
/* 
It is mandatory to use these two lines if we want to use environment variables 

import dotenv from "dotenv" 
dotenv.config()
*/
import dotenv from "dotenv";

dotenv.config();

// create a database connection
// you can also create a separate file for the database connection and then import it here
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database", err);
});

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(
  cors(
    {
        origin: "http://localhost:5173/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Content-Type", 
          "Authorization",
          "Cache-Control",
          "Expires",
          "Pragma"
        ],
        credentials: true
    }
  )
);

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
