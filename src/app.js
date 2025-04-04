import express, { text } from "express"
import router from "./routes/index.js"
import {join} from "node:path"
import { errorHandlerMiddleware } from "./middleware/error.handler.middlaware.js"
import { BaseException } from "./exception/base.exception.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads",express.static(join(process.cwd(),"uploads")))

app.use("/api", router)

app.all("/*", (req, res) => {
    throw new BaseException(`Given ${req.url} with method: ${req.method} not found`, 404)
})

app.use(errorHandlerMiddleware)
export default app