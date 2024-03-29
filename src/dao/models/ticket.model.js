import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true, default: uuidv4 },
  purchase_datetime: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
});

mongoose.set("strictQuery", false);
const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;