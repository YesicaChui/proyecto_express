import UserModel from "../models/user.model.js"

export default class User {
    constructor() {}
   // getAll = async() => await productModel.find()
    
    getOne = async(email) => await UserModel.findOne({ email: email })
    getById = async(id) => await  UserModel.findById(id)
    create = async(data) => await  UserModel.create(data)
    update = async(id, data) => await UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
    // delete = async(id) => await productModel.findByIdAndDelete(id)
}