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
      success_url: `${front_url}/orders/${order._id}/verify?success=true`,
      cancel_url: `${front_url}/orders/${order._id}/verify?success=false`,
    });
    res.json({ id: session.id, url: session.url, status: true });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, message: "Failed to place the order" });
  }
};
const user_orders_get=async(req,res)=>{
  try{
    const userId=req.userId;
    const orders=await orderModel.find({userId});
    if(!orders)
      throw Error("couldn't find user's orders");
    res.json({
      status:true,
      message:"orders fetched successfully",
      orders
    })
  }catch(e){
    console.log(e);
    req.status(404).json({status:false,message:e.message});
  }
}
const all_orders_get=async(req,res)=>{
  try{
    const orders=await orderModel.find();
    if(!orders){
      throw Error("Couldn't fetch orders")
    };
    res.json({
      status:true,
      message:"Orders fetched successfully",
      orders
    });
  }catch(err){
    console.log(err);
    req.status(400).json({status:false,message:err.message});
  }
};
const order_status_put=async(req,res)=>{
  try{
    const orderId=req.params.id;
    const status=req.body.status;
    const order=await orderModel.findByIdAndUpdate(orderId,{status:status},{new:true});
    if(!order){
      throw Error("Order not found");
    }
    res.status(201).json({status:true,message:"order updated",order});
  }catch(err){
    console.log(err);
    res.status(404).json({status:false,message:err.message});
  }
};
const verify_order=async(req,res)=>{
  const {id}=req.params;
  const {success}=req.query;
  try{
  const order=await orderModel.findById(id);
  if(!order){
    throw Error("Couldn't find the order");
  }
  if(success=="true"){
    order.payment=true;
    await order.save();
    res.json({status:true,message:"order verified",order});
  }else{
    await orderModel.deleteOne({_id:id});
    res.json({status:true,message:"order deleted"});
  }
}catch(err){
  if(err.message.includes("Cast to ObjectId")){
    err.message="Invalid order id";
  }
  res.status(404).json({status:false,message:err.message});
}
}
export { placeOrder,user_orders_get,all_orders_get,order_status_put ,verify_order};
