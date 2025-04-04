import { Router } from "express"
import foodController from "../controller/food.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { createFoodSchema } from "../schema/food.schema.js"
import { upload } from "../config/multer.config.js"
import { Protected } from "../middleware/protected.middleware.js"
import { Roles } from "../middleware/roles.middleware.js"

const foodRouter = Router()

foodRouter
    .get("/", Protected(false), Roles("VIEWER"), foodController.getAllFoods)
    .get("/:id", Protected(false), Roles("VIEWER"), foodController.getOneFood)
    .post("/", Protected(true), Roles("RESTAURANT_OWNER", "SUPER_ADMIN"), upload.single("image"), ValidationMiddleware(createFoodSchema), foodController.createFood)
    .patch("/:id", Protected(true), Roles("RESTAURANT_OWNER", "SUPER_ADMIN"), foodController.updateFood)
    .delete("/:id", Protected(true), Roles("RESTAURANT_OWNER", "SUPER_ADMIN"), foodController.deleteFood)

export default foodRouter
