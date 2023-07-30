import TicketModel from '../models/ticket.model.js';
import logger from '../../logger.js';
export class TicketManagerMongoDB {
  constructor() {
    this.tickets = []
  }

  async addTicket(data) {
    try {

      const newTicket = new TicketModel(data)

      return await newTicket.save()

    } catch (error) {
      return {
        status: "error",
        message: error.message
      };
    }
  }

  async getTickets() {
    try {
      return await TicketModel.find().lean().exec()

    } catch (error) {   
      return {
        status: "error",
        message: error.message
      };
    }
  }

  async getTicketById(id) {
    try {
      const ticket = await TicketModel.findOne({ _id:id }).lean().exec()
      if (ticket) {
        return ticket
      } else {
        return "Not found"
      }
    } catch (error) {
      logger.log('error', `error leyendo un carrito ${error}`)     
    }
  }

  async updateTicket(id, fieldsToUpdate) {
    try {
      const ticket = await TicketModel.findOneAndUpdate(
        { _id: id },
        { $set: fieldsToUpdate },
        { new: true } // Retorna el documento actualizado en lugar del anterior
      )

      if (ticket) {
        return "El objeto se ha actualizado correctamente."
      } else {
        return "No se ha encontrado un objeto con el id especificado."
      }
    } catch (error) {
      logger.log('error', `error actualizando un carrito ${error}`)
    }
  }

  async deleteTicket(id) {
    return TicketModel.deleteOne({_id: id })
      .then((result) => {
        if (result.deletedCount === 1) {
          return "El objeto se ha eliminado correctamente.";
        } else {
          return "No se ha encontrado un objeto con el id especificado.";
        }
      })
      .catch((err) => {
        logger.log('error', `error eliminando un carrito ${err}`)
        return "Error al eliminar el objeto.";
      });
  }
  
  
}
