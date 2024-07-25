import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.router.js";
dotenv.config();
const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((err) => {
    console.log("Err", err);
  });
app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
