import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: {
    type: String,
    enum: ['admin', 'user', 'premium'],
    default: 'user'
  },
  last_connection: { type: Date },
  photo: {
    type: String
  },
  document: {
    type: String
  }

})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel