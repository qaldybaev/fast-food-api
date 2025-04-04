import { Router } from "express"
import categoryController from "../controller/category.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { createCategorySchema, updateCategorySchema } from "../schema/category.schema.js"
import { Protected } from "../middleware/protected.middleware.js"
import { Roles } from "../middleware/roles.middleware.js"

const categoryRoute = Router()

categoryRoute
    .get("/", Protected(false), Roles("VIEWER"), categoryController.getAllCategories)
    .get("/:id", Protected(false), Roles("VIEWER"), categoryController.getCategoryById)
    .post("/", Protected(true), Roles("SUPER_ADMIN"), ValidationMiddleware(createCategorySchema), categoryController.createCategory)
    .put("/:id", Protected(true), Roles("SUPER_ADMIN"), ValidationMiddleware(updateCategorySchema), categoryController.updateCategory)
    .delete("/:id", Protected(true), Roles("SUPER_ADMIN"), categoryController.deleteCategory)

export default categoryRoute
