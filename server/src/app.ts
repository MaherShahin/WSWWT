import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import connectDB from "../config/database";
import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/user";
import roomRouter from "./routes/api/room";
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


app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use(errorMiddleware);

export default app;
