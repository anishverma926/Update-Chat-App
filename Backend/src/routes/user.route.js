import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getLastSeen, getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// ✅ Fetch all users except logged-in user
router.get("/", protectRoute, getUsersForSidebar);

// ✅ Get last seen for a specific user
router.get("/:id/last-seen", protectRoute, getLastSeen);

export default router;
