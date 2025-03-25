import { Router } from "express";
import categoryRoute from "./category.route.js";

const router = Router()

router.use("/categories",categoryRoute)

export default router
