import bodyParser from "body-parser";
import express, { NextFunction } from "express";
import cors from 'cors';
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import room from "./routes/api/room";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/room", room)

export default app;
