
import mongoose from "mongoose";

const OrderShema = new mongoose.Schema({
    totalPrice: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "OrderItem"
        }
    ]

},
    {
        collection: "orders",
        timestamps: true,
        versionKey: false
    })

export default mongoose.model("Order", OrderShema)