export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = async(limit, page, query, sort) => await this.dao.getAll(limit, page, query, sort)
    getById = async(id) => await this.dao.getById(id)
    create = async(data) => await this.dao.create(data)
    update = async(id, data) => await this.dao.update(id, data)
    delete = async(id) => await this.dao.delete(id)
}