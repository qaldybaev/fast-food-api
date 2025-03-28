import { Router } from "express";
import categoryRoute from "./category.route.js";
import foodRouter from "./food.route.js";
import userRouter from "./user.route.js";

const router = Router()

router.use("/categories", categoryRoute)
router.use("/foods", foodRouter)
router.use("/users/register", userRouter)

export default router
