import foodModel from "../models/food.model.js";
import ImageKit from "imagekit";
let imagekit = new ImageKit({
  publicKey: process.env.IMAGE_PUBLIC_KEY,
  privateKey: process.env.IMAGE_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_URL,
});
const food_get = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res.status(200).json({
      status: true,
      message: "Food Items Fetched Successfully",
      data: foodItems,
    });
  } catch {
    res
      .status(400)
      .json({ status: false, message: "failed to fetch food items" });
  }
};
const food_post = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const file = req.file;
    imagekit.upload(
      {
        file: file.buffer, //required
        fileName: Date.now() + "-" + file.originalname, //required
        folder: "food",
      },
      async function (err, result) {
        if (err) {
          throw Error("failed to upload image");
        } else {
          const foodItem = await foodModel.create({
            name,
            description,
            price,
            image: { id: result.fileId, url: result.url },
            category,
          });
          if (foodItem)
            res.status(201).json({
              status: true,
              message: "Food Item Added Successfully",
              data: foodItem,
            });
        }
      }
    );
  } catch(err) {
    console.log(err);
    res.status(400).json({ status: false, message: "failed to add food item" });
  }
};

const food_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const foodItem = await foodModel.findByIdAndDelete(id);
    if (foodItem) {
      await imagekit.deleteFile(foodItem.image.id);
      res.status(200).json({
        status: true,
        message: "Food Item Deleted Successfully",
        data: foodItem,
      });
    } else {
      throw Error("failed to delete food item");
    }
  } catch (err) {
    res.status(404).json({ status: false, message: err.message });
  }
};

export { food_get, food_post,food_delete };
