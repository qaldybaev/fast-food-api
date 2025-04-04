import { Router } from "express"
import userController from "../controller/user.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { registerSchema } from "../schema/user.schema.js"
import { Protected } from "../middleware/protected.middleware.js"
import { Roles } from "../middleware/roles.middleware.js"

const userRouter = Router()

userRouter
    .get("/", Protected(true), Roles("SUPER_ADMIN"), userController.getAllUsers)
    .post("/register", ValidationMiddleware(registerSchema), userController.register)
    .post("/login", userController.login)

export default userRouter
