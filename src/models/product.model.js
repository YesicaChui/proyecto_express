import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
		title: String,
		description: String,
		price: Number,
		thumbnail: String,
		code: String,
		stock: Number
})

const productModel = mongoose.model("products", productSchema)

export default productModel