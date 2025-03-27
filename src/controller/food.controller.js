import { isValidObjectId } from "mongoose"
import foodModel from "../model/food.model.js"
import categoryModel from "../model/category.model.js";


const getAllFoods = async (req, res) => {
    const products = await foodModel.find()
        .populate({
            path: "category",
            select: "-foods -createdAt -updatedAt"
        })
        .select("-createdAt -updatedAt");

    res.send({
        message: "Success✅",
        count: products.length,
        data: products
    });
}

const getOneFood = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`
        });
    }

    const food = await foodModel.findById(id)
        .populate({
            path: "category",
            select: "-foods -createdAt -updatedAt"
        })
        .select("-createdAt -updatedAt");

    if (!food) {
        return res.status(404).send({ message: "Taom topilmadi ❌" });
    }

    res.send({
        message: "Success✅",
        data: food
    });
}

const createFood = async (req, res) => {
    const { name, price, category, description, imageUrl } = req.body;
  
    const foundedCategory = await categoryModel.findById(category);
  
    if (!foundedCategory) {
      return res.status(404).send({
        message: `Category with ID: ${category} not found`,
      });
    }
  
    const food = await foodModel.create({
      name,
      price,
      category,
      description,
      imageUrl,
    });
  
    await categoryModel.updateOne(
      { _id: category },
      {
        $push: {
          foods: food._id,
        },
      }
    );
  
    res.status(201).send({
      message: "success",
      data: food,
    });
  };
  

const updateFood = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`
        });
    }

    const { name, price, description } = req.body;

    const food = await foodModel.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
    );

    if (!food) {
        return res.status(404).send({ message: "Taom topilmadi ❌" });
    }

    res.send({
        message: "Yangilandi ✅",
        data: food
    });
}

const deleteFood = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`
        });
    }

    const food = await foodModel.findById(id);
    if (!food) {
        return res.status(404).send({ message: "Taom topilmadi ❌" });
    }

    await foodModel.deleteOne({ _id: id });

    res.status(204).send();
}

export default { getAllFoods, getOneFood, createFood, deleteFood, updateFood };
