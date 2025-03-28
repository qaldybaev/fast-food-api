import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerSchema } from "../schema/user.schema.js";

const userRouter = Router()

userRouter
    .get("/", userController.getAllUsers)
    .post("/", ValidationMiddleware(registerSchema), userController.register)
    .post("/",userController.login)

export default userRouter