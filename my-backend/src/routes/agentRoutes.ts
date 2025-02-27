import express from "express";
import { loginAgent, registerAgent } from "../controllers/agentController";

const router = express.Router();

router.post("/register-agent", registerAgent);
router.post("/admin-login", loginAgent);

export default router;
