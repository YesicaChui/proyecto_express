export default class UserRepository {
  constructor(dao) {
      this.dao = dao
  }
  getAll = async(data = {}) => await this.dao.getAll(data)
  getOne = async(email) => await this.dao.getOne(email)
  getById = async(id) => await this.dao.getById(id)
  create = async(data) => await this.dao.create(data)
  update = async(id, data) => await this.dao.update(id, data)
  delete = async(id) => await this.dao.delete(id)
  getInactives = async (date) =>await this.dao.getInactives(date)
  cleanInactiveUsers = async (date)  => await this.dao.cleanInactiveUsers(date)
}