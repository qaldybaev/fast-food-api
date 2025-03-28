import { isValidObjectId } from "mongoose"
import foodModel from "../model/food.model.js"
import categoryModel from "../model/category.model.js";
import { BaseException } from "../exception/base.exception.js";


const getAllFoods = async (req, res,next) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

const getOneFood = async (req, res,next) => {
    try {
        const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new BaseException(`Given ID: ${id} is not valid Object ID`,400)
    }

    const food = await foodModel.findById(id)
        .populate({
            path: "category",
            select: "-foods -createdAt -updatedAt"
        })
        .select("-createdAt -updatedAt");

    if (!food) {
        throw new BaseException("Id topilmadi",404)
    }

    res.send({
        message: "Success✅",
        data: food
    });
    } catch (error) {
        next(error)
    }
}

const createFood = async (req, res,next) => {
   try {
    const { name, price, category, description, imageUrl } = req.body;
  
    const foundedCategory = await categoryModel.findById(category);
  
    if (!foundedCategory) {
      throw new BaseException(`Category with ID: ${category} not found`,404)
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
   } catch (error) {
    next(error)
   }
  };
  

const updateFood = async (req, res,next) => {
    try {
        const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new BaseException(`Given ID: ${id} is not valid Object ID`,400)
    }

    const { name, price, description } = req.body;

    const food = await foodModel.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
    );

    if (!food) {
        throw new BaseException("Id topilmadi",404)
        
    }

    res.send({
        message: "Yangilandi ✅",
        data: food
    });
    } catch (error) {
        next(error)
    }
}

const deleteFood = async (req, res,next) => {
    try {
        const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new BaseException(`Given ID: ${id} is not valid Object ID`,400)
    }

    const food = await foodModel.findById(id);
    if (!food) {
        throw new BaseException("Id topilmadi",404)
    }

    await foodModel.deleteOne({ _id: id });

    res.status(204).send();
    } catch (error) {
        next(error)
    }
}

export default { getAllFoods, getOneFood, createFood, deleteFood, updateFood };
