import UserModel from "../models/user.model.js"

export default class User {
    constructor() { }
    getAll = async (data = {}) => await UserModel.find(data);
    getOne = async (email) => await UserModel.findOne({ email: email })
    getById = async (id) => await UserModel.findById(id)
    create = async (data) => await UserModel.create(data)
    update = async (id, data) => await UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
    //delete = async(id) => await UserModel.findByIdAndDelete(id)
    getInactives = async (date) => await UserModel.find({
        last_connection: {
            $exists: true, // Verifica que el campo exista
            $lt: date, // Elimina usuarios cuya última conexión es anterior a hace 2 días
        },
    });
    cleanInactiveUsers = async (date) => await UserModel.deleteMany({
        last_connection: {
            $exists: true, // Verifica que el campo exista
            $lt: date, // Elimina usuarios cuya última conexión es anterior a hace 2 días
        },
    });

}