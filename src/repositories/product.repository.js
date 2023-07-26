export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = async(limit, page, query, sort) => await this.dao.getAll(limit, page, query, sort)
    getById = async(id) => await this.dao.getById(id)
    create = async(title, description, price, thumbnails, code, stock) => await this.dao.create(title, description, price, thumbnails, code, stock)
    update = async(id, data) => await this.dao.update(id, data)
    delete = async(id) => await this.dao.delete(id)
}