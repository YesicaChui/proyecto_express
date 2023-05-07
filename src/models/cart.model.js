import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
		products: [
			{
				product: Number,
				quantity: Number
			}
		]
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel