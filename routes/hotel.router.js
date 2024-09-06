import express from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model.js";
import { body } from "express-validator";
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
// ============================================== CREATE HOTEL ==============================================

router.post(
  "/create",
  [body("name").notEmpty().withMessage("Name ne is required")],

  upload.array("imageFiles", 12),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newHotel = req.body;

      const imageUrls = await uploadImages(imageFiles);

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
// ============================================== GET HOTEL BY ID ==============================================
router.post("/getHotelById", async (req, res) => {
  //   const id = req.params.id.toString();
  const id = req.body.id;
  try {
    const hotel = await Hotel.find({
      _id: id,
      //   userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});
// ============================================== UPDATE ==============================================
router.post("/editHotel", upload.array("imageFiles"), async (req, res) => {
  const id = req.body.id;

  try {
    const updatedHotel = req.body;
    updatedHotel.lastUpdated = new Date();
    console.log("upated Hotel", updatedHotel);
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: id,
      },
      updatedHotel,
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files;
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;
