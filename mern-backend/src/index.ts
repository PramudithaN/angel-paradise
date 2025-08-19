import productImageUploadRoute from "./routes/productImageUploadRoute";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import reviewRoutes from "./routes/reviewRoutes";
import productRoutes from "./routes/productRoutes";

import businessInfoRoutes from "./routes/businessInfoRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
// CORS middleware should be at the top
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());
// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
app.use("/api/products", productImageUploadRoute);

app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);

app.use("/api/business-info", businessInfoRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/angel_paradise";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
