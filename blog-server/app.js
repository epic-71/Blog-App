import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);

// Error Handling Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
