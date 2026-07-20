import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ContactController } from "../controllers/ContactController";
import { NewsController } from "../controllers/NewsController";
import { TeamController } from "../controllers/TeamController";
import { SettingController } from "../controllers/SettingController";
import { CloudinaryController } from "../controllers/CloudinaryController";
import { CategoryController } from "../controllers/CategoryController";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Auth
router.post("/auth/login", AuthController.login);

// Products
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.post("/products", authMiddleware, ProductController.create);
router.put("/products/:id", authMiddleware, ProductController.update);
router.delete("/products/:id", authMiddleware, ProductController.delete);

// News
router.get("/news", NewsController.getAll);
router.get("/news/:id", NewsController.getOne);
router.post("/news", authMiddleware, NewsController.create);
router.put("/news/:id", authMiddleware, NewsController.update);
router.delete("/news/:id", authMiddleware, NewsController.delete);

// Team
router.get("/team", TeamController.getAll);
router.get("/team/:id", TeamController.getOne);
router.post("/team", authMiddleware, TeamController.create);
router.put("/team/:id", authMiddleware, TeamController.update);
router.delete("/team/:id", authMiddleware, TeamController.delete);

// Contact
router.post("/contact", ContactController.submit);
router.get("/contacts", authMiddleware, ContactController.getAll);

// Cloudinary
router.post("/cloudinary/delete", authMiddleware, CloudinaryController.deleteImage);

// Settings
router.get("/settings", SettingController.getAll);
router.post("/settings", authMiddleware, SettingController.save);

// Categories
router.get("/categories", CategoryController.getAll);
router.get("/categories/:id", CategoryController.getOne);
router.post("/categories", authMiddleware, CategoryController.create);
router.put("/categories/:id", authMiddleware, CategoryController.update);
router.delete("/categories/:id", authMiddleware, CategoryController.delete);

export default router;
