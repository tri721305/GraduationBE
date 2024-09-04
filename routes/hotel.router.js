import express from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    // Max Size 5MB
    fileSize: 5 * 1024 * 1024,
  },
});
router.post(
  "/create",

  //   [body("name").notEmpty().withMessage("Name is required")],
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }).array("image", 12),
  //   upload.single("image"),
  async (req, res) => {
    try {
      console.log("data nè", req.files);
      const imageFiles = req.files;
      const newHotel = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      //   newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error createing hotel:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
