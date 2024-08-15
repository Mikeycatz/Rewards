import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
      },
    ],
    shippingAddress: {
      address1: { type: String, required: true },
      address2: { type: String, required: false },
      address4: { type: String, required: false },
      address3: { type: String, required: false },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
