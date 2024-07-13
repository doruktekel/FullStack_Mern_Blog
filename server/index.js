import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
dotenv.config();
connectDb();

app.use(express.json());

app.use("/", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Interval Error !";
  let stack = process.env.NODE_ENV === "developer" ? err.stack : null;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening port : ${PORT}`);
});
