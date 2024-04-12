import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

//load env variables
dotenv.config();

// rest object 
const app = express();

//connect to db 
connectDB();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api 
app.get('/', (req, res) => {
    res.send({ message: 'Hello from server!' });
})

//port
const PORT = process.env.PORT || 8080;


//listen to port
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});