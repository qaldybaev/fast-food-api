import app from "./app.js";
import connectDB from "./config/mongo.config.js"
import {PORT} from "./config/app.config.js"

await connectDB()


app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`)
})