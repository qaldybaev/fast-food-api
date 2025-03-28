import express, { text } from "express"
import router from "./routes/index.js"
import Joi from "joi"
import { errorHandlerMiddleware } from "./middleware/error.handler.middlaware.js"
import { BaseException } from "./exception/base.exception.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)

app.all("/*", (req, res) => {
    throw new BaseException(`Given ${req.url} with method: ${req.method} not found`, 404)
})

app.use(errorHandlerMiddleware)
export default app