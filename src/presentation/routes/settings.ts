import { Router } from "express";
import { SettingController } from "../controllers/SettingController";

const router = Router();

router.get("/", SettingController.getAll);
router.post("/", SettingController.save);

export default router;
