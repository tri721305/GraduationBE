import express from "express";
import Hotel from "../models/hotel.model.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const page = req?.body?.page ? req.body.page : 1;
    const pageSize = req?.body?.pageSize ? req.body.pageSize : 10;

    const skip = (page - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();

    const response = {
      data: hotels,
      pagination: {
        total,
        page: page,
        // pageSize: Math.ceil(total / pageSize),
        pageSize,
      },
    };
    console.log("hotels", hotels, "total", total);

    res.json(response);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
export default router;
