import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();
const corsOpt = {
  origin: "*",
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOpt));
mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017/food-delivery")
  .then((res) => {
    console.log("Conneted to Database");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));

app.use("/api", userRouter);
app.use("/api/food", foodRouter);
