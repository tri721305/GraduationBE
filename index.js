import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.router.js";
import planRoutes from "./routes/plan.route.js";
import hotelRoutes from "./routes/hotel.router.js";
import { upload } from "./middleware/multer.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./configs/firebase.config.js";
import auth from "./configs/firebase.config.js";

// CLOUDINARY
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
const uploadImage = async (file, quantity) => {
  const storageFB = getStorage();
  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );
  if (quantity == "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File successfully uploaded.");
    // await uploadBytesResumable(storageRef, file.buffer, metadata);
    return { file: fileName, url: downloadURL };
  }
  if (quantity == "multiple") {
    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {
        contentType: file.type,
      };
      const saveImage = await Image.create({ imageUrl: fileName });
      file.item.imageId.push({ _id: saveImage._id });
      await file.item.save();
      await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
    }
    return;
  }
};

app.use("/api/auth", authRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/plans", planRoutes);
app.use("/api/hotel", hotelRoutes);

// Test upload
app.post("/test-upload", upload, async (req, res) => {
  const file = {
    type: req.file.mimetype,
    buffer: req.file.buffer,
  };
  console.log("req nè", req.file);
  try {
    const buildImage = await uploadImage(file, "single");
    res.send({
      status: "SUCCESS",
      imageName: buildImage,
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
