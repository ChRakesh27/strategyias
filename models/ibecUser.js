import mongoose from "mongoose";

const ibecUserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    paymentImg: {
      type: String,
    },
    typeOfCopy: {
      type: String,
      required: true,
    },
    registerAt: {
      type: Date,
      default: new Date().toISOString(),
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
mongoose.models = {};
const IbecUsers = mongoose.model("IbecUser", ibecUserSchema);
export default IbecUsers;
