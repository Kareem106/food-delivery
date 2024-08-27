import orderModel from "../models/order.model.js";
import foodModel from "../models/food.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";
const front_url = process.env.FRONT_URL;
const stripe = new Stripe(process.env.STRIPE_SECRET);
const placeOrder = async (req, res) => {
  const { items, address } = req.body;
  //convert items object to array of ids
  try {
    let itemsCollection = await foodModel.find({
      _id: { $in: items.map((item) => new mongoose.Types.ObjectId(item._id)) },
    });
    //adding quantity to each item
    itemsCollection = itemsCollection.map((item) => ({
      ...item._doc,
      quantity: req.body.items.find((i) => i._id == item._id.toString()).count,
    }));
    const order = await orderModel.create({
      userId: req.userId,
      address,
      items: itemsCollection,
    });
    if (!order) throw Error();
    const line_items = itemsCollection.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: line_items,
      success_url: front_url,
      cancel_url: front_url,
    });
    res.json({ id: session.id, url: session.url, status: true });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, message: "Failed to place the order" });
  }
};

export { placeOrder };
