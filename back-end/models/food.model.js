import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    required: true,
    _id: false,
  },
  category: {
    type: String,
    required: true,
  },
});
const Food = mongoose.model("foods", foodSchema);

export default Food;
