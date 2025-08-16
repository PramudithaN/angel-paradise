import express, { Request, Response } from "express";
import mongoose from "mongoose";

const router = express.Router();

const businessInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  about: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  whatsapp: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

const BusinessInfo = mongoose.model("BusinessInfo", businessInfoSchema);

// Get business info (single document)
router.get("/", async (req: Request, res: Response) => {
  try {
    const info = await BusinessInfo.findOne();
    res.json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch business info" });
  }
});

// Update or create business info
router.post("/", async (req: Request, res: Response) => {
  try {
    const update = req.body;
    let info = await BusinessInfo.findOne();
    if (info) {
      Object.assign(info, update, { updatedAt: new Date() });
      await info.save();
    } else {
      info = new BusinessInfo(update);
      await info.save();
    }
    res.json(info);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to save business info" });
  }
});

export default router;
