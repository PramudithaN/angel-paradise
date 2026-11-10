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
import { seedDatabase } from "./seed";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://angel-paradise.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
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
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/angel_paradise";

async function startServer() {
  try {
    // Attempt connecting to the configured MongoDB with a 2-second timeout
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    await seedDatabase();
  } catch {
    console.warn("Local MongoDB instance not reachable. Booting integrated in-memory MongoDB engine...");
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`Connected to embedded MongoDB at ${inMemoryUri}`);
      await seedDatabase();
    } catch (memErr) {
      console.error("Failed to start embedded database:", memErr);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Angel's Paradise backend server running on http://localhost:${PORT}`);
  });
}

startServer();
