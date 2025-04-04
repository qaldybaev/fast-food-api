import { Router } from "express"
import orderController from "../controller/order.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { createOrderSchema } from "../schema/order.schema.js"
import { Protected } from "../middleware/protected.middleware.js"
import { Roles } from "../middleware/roles.middleware.js"

const orderRouter = Router()

orderRouter
    .post("/", Protected(true), Roles("VIEWER"), ValidationMiddleware(createOrderSchema), orderController.createOrder)
    .get("/", Protected(true), Roles("RESTAURANT_OWNER", "SUPER_ADMIN"), orderController.getAllOrders)

export default orderRouter
