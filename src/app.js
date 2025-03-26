import express from "express"
import router from "./routes/index.js"
import Joi from "joi"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//     if (req.method === "POST") {
//         const { body } = req

//         const categorySchema = Joi.object({
//             name: Joi.string().min(4).max(8).required()
//         })

//         const { error, value } = categorySchema.validate(body)

//         if (error) {
//             return res.status(400).send({
//                 message: error.message
//             })
//         }

//         console.log(value)
//     }

//     next()
// })

app.use("/api", router)

app.all("/*", (req, res) => {
    res.status(404).send({
        message: `Given ${req.url} with method: ${req.method} not found`
    })
})
export default app