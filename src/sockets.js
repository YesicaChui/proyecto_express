import messageModel from './dao/models/message.model.js'
import logger from './logger.js'
export default (io) => {

    io.on('connection', async(socketClient) => {
        logger.log('info', `Nuevo cliente ${socketClient.id} conectado...`)
        socketClient.broadcast.emit('alerta')
        let messages = await messageModel.find().lean().exec()
        socketClient.emit("logs", messages)
        socketClient.on("message", async data => {
            await messageModel.create(data)
            let messages = await messageModel.find().lean().exec()
            io.emit("logs", messages)
        })
      })
}