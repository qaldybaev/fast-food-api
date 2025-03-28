import { Router } from "express";
import foodController from "../controller/food.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema } from "../schema/food.schema.js";

const foodRouter = Router()

foodRouter
    .get("/", foodController.getAllFoods)
    .post("/",ValidationMiddleware(createFoodSchema), foodController.createFood)
    .get("/:id",foodController.getOneFood)
    .patch("/:id",foodController.updateFood)
    .delete("/:id",foodController.deleteFood)

export default foodRouter