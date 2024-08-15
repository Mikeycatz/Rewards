import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc    CREATE NEW ORDER
// @route   POST /api/orders
// @acess   Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, itemsPrice, totalPrice } = req.body;
  const userDB = await User.findById({ _id: req.user.id });
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else if (userDB.points - totalPrice < 0) {
    res.status(400);
    throw new Error("Not enough points");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      userDetails: userDB,
      user: req.user.id,
      shippingAddress,
      itemsPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    try {
      await User.updateOne(
        { _id: req.user.id },
        { $set: { points: userDB.points - totalPrice } }
      );
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }

    const totalRemainingPoints = userDB.points - totalPrice;
    res.status(201).json({ createdOrder, totalRemainingPoints });
  }
});

// @desc    GET LOGGED IN USER ORDERS
// @route   GET /api/orders/myorders
// @acess   Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

// @desc    GET ORDER BY ID
// @route   GET /api/orders/:id
// @acess   Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if ((order && order.user._id.equals(req.user.id)) || req.user.isAdmin) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc    GET ALL ORDERS
// @route   GET /api/orders
// @acess   Private/Admin

//Gets all orders and then populates from user collection the id and name
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export { addOrderItems, getMyOrders, getOrderById, getOrders };
