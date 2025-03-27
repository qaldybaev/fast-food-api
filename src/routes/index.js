import { Router } from "express";
import categoryRoute from "./category.route.js";
import foodRouter from "./food.route.js";

const router = Router()

router.use("/categories",categoryRoute)
router.use("/foods",foodRouter)

export default router
