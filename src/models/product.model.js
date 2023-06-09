import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
		title: String,
		description: String,
		price: Number,
		thumbnail: String,
		code: String,
		stock: Number,
		category:String,
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model("products", productSchema)

export default productModel