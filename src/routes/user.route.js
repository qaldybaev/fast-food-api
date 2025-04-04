import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerSchema } from "../schema/user.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constans/role.constants.js";

const userRouter = Router();

userRouter
  .get(
    "/",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    userController.getAllUsers
  )
  .post(
    "/register",
    Protected(false),
    Roles(ROLES.ALL),
    ValidationMiddleware(registerSchema),
    userController.register
  )
  .post("/login", Protected(false), Roles(ROLES.ALL), userController.login);

export default userRouter;
