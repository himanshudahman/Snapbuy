import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.objectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: { type: mongoose.objectId, ref: "User" },
    status: {
      type: String,
      default: "not processed",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
