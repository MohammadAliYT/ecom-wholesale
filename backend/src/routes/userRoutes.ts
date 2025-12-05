import { Router } from "express";
import {
  signup,
  login,
  viewUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";
import rateLimit from "express-rate-limit";
import { authenticate } from "../middleware/adminAuth";
import { authorize } from "../middleware/otherAuth";

const router = Router();
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 signup attempts per 15 minutes
  message: "Too many signups from this IP, please try again later",
});

router.post("/signup", signupLimiter, signup);
router.post("/login", login);

// RBAC -- SUPERADMIN
router.get("/users", authenticate, authorize(1), viewUsers);
router.get("/:id", authenticate, authorize(1), getUserById);
router.patch("/:id", authenticate, authorize(1), updateUser);
router.delete("/:id", authenticate, authorize(1), deleteUser);

export default router;
