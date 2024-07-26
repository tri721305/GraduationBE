import express from "express";
import auth from "../middleware/auth.js";
import {
  getPlans,
  getPlansBySearch,
  getPlan,
  createPlan,
  updatePlan,
  // likePlan,
  commentPlan,
  deletePlan,
} from "../controllers/plan.controller.js";
const router = express.Router();

router.get("/search", getPlansBySearch);

router.get("/", getPlans);
router.get("/:id", getPlan);

router.post("/", createPlan);
router.patch("/:id", auth, updatePlan);
// router.patch("/:id/likePlan", auth, likePlan);
router.delete("/:id", auth, deletePlan);
router.post("/:id/commentPlan", commentPlan);
export default router;
