import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await userModel.findOne({
            _id: decoded.id,
        });
        if (!user || user.role!=="admin") {
            throw new Error();
        }
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate" });
    }
};
export default adminAuth