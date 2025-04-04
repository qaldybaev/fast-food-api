import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constans/role.constants.js";

const categoryRoute = Router();

categoryRoute
  .get(
    "/",
    Protected(false),
    Roles(ROLES.ALL),
    categoryController.getAllCategories
  )
  .get(
    "/:id",
    Protected(false),
    Roles(ROLES.ALL),
    categoryController.getCategoryById
  )
  .post(
    "/",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER,ROLES.SUPER_ADMIN),
    ValidationMiddleware(createCategorySchema),
    categoryController.createCategory
  )
  .put(
    "/:id",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER,ROLES.SUPER_ADMIN),
    ValidationMiddleware(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete(
    "/:id",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER,ROLES.SUPER_ADMIN),
    categoryController.deleteCategory
  );

export default categoryRoute;
