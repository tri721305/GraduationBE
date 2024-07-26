import PlanMessage from "../models/plans.model.js";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const getPlans = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PlanMessage.countDocuments({});
    const plans = await PlanMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: plans,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log("error");
    res.status(404).json({ message: error.message });
  }
};

export const getPlansBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const location = new RegExp(searchQuery, "i");

    const plans = await PlanMessage.find({
      $or: [{ location }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: plans });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await PlanMessage.findById(id);
    // console.log(plan);
    res.status(200).json(plan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  //   const { title, message, selectedFile, creator, tags } = req.body;
  // res.send(req.body);
  const plan = req.body;

  const newPlanMessage = new PlanMessage({
    ...plan,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPlanMessage.save();

    res.status(201).json(newPlanMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No plan with id: ${id}`);

  const updatedPlan = { creator, title, message, tags, selectedFile, _id: id };

  await PlanMessage.findByIdAndUpdate(id, updatedPlan, { new: true });

  res.json(updatedPlan);
};
export const deletePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No plan with id: ${id}`);

  await PlanMessage.findByIdAndRemove(id);

  res.json({ message: "Plan deleted successfully." });
};

export const commentPlan = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const plan = await PlanMessage.findById(id);

  plan.comments.push(value);

  const updatedPlan = await PlanMessage.findByIdAndUpdate(id, plan, {
    new: true,
  });

  res.json(updatedPlan);
};
export default router;
