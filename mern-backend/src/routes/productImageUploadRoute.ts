import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// ...existing code...

// Use multer memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/products/upload
router.post(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "angel-paradise-products" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload error:", error);
            return res
              .status(500)
              .json({ error: "Cloudinary upload failed", details: error });
          }
          res.json({ imageUrl: result.secure_url });
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    } catch {
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

export default router;
