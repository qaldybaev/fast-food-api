import foodModel from "../model/food.model.js"

const getAllFoods = async (req, res) => {
    const products = await foodModel.find().populate("category")

    res.send({
        message: "Success✅",
        count: products.length,
        data: products
    })
}

const createFood = async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body

    const food = await foodModel.create({
        name, description, price, category, imageUrl
    })

    res.status(201).send({
        message: "Success",
        data: food
    })
}
export default { getAllFoods,createFood }