import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ContactController } from "../controllers/ContactController";
import { NewsController } from "../controllers/NewsController";
import { TeamController } from "../controllers/TeamController";
import { SettingController } from "../controllers/SettingController";

const router = Router();

// Products
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

// News
router.get("/news", NewsController.getAll);
router.get("/news/:id", NewsController.getOne);
router.post("/news", NewsController.create);
router.put("/news/:id", NewsController.update);
router.delete("/news/:id", NewsController.delete);

// Team
router.get("/team", TeamController.getAll);
router.get("/team/:id", TeamController.getOne);
router.post("/team", TeamController.create);
router.put("/team/:id", TeamController.update);
router.delete("/team/:id", TeamController.delete);

// Contact
router.post("/contact", ContactController.submit);
router.get("/contacts", ContactController.getAll);

import { CloudinaryController } from "../controllers/CloudinaryController";
import { CategoryController } from "../controllers/CategoryController";

// Cloudinary
router.post("/cloudinary/delete", CloudinaryController.deleteImage);

// Settings
router.get("/settings", SettingController.getAll);
router.post("/settings", SettingController.save);

// Categories
router.get("/categories", CategoryController.getAll);
router.get("/categories/:id", CategoryController.getOne);
router.post("/categories", CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

export default router;
