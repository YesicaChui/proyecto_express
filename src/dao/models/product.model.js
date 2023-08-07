import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
		title: String,
		description: String,
		price: Number,
		thumbnails: String,
		code: String,
		stock: Number,
		category:String,
		owner: { type: String, default: 'admin', ref: "users" }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model("products", productSchema)

export default productModel