import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
// import room from "./routes/api/room";
import { errorMiddleware } from "./middleware/errorMiddleware";
import Request from "./types/Request";
import { Response,NextFunction } from "express";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
// app.use("/api/room", room)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ errors: [{ msg: message }] });
});


export default app;
