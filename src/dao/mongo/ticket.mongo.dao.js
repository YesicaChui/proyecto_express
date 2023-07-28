import { TicketManagerMongoDB } from "../mongoManagers/TicketManagerMongoDB.js"
const ticketManager = new TicketManagerMongoDB()
export default class Ticket {
    constructor() {}
    getAll = async() => await ticketManager.getTickets()
    getById = async(id) =>  await ticketManager.getTicketById(id)
    create = async(data) =>await ticketManager.addTicket(data)
    update = async(id, data) =>  await ticketManager.updateTicket(id, data)
    delete = async(id) => await ticketManager.deleteTicket(id)
}