import { UserService } from "../repositories/index.js";
import { UserPrincipalDTO } from "../dtos/userDTO.js";
import { subDays,subMinutes } from 'date-fns';
import { CartService } from "../repositories/index.js";
import { sendGenericEmail } from "./email.controller.js";
export const setPhotoProfileUsersController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { file } = req;
    if (!req.file) {
      return res.send({ error: "No hay foto" })
    }
    const newUserPhoto = await UserService.update(userId, {
      photo: `/img/profile/${file.filename}`
    });
    if (!newUserPhoto) {
      return res.send({ error: "No hay foto" })
    }
    res.send({ status: "success", message: "foto subida" })
  } catch (err) {
    console.log(err)
    return res.send({ error: "Error subiendo la foto" })
  }
};

export const setDocumentsUsersController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.file) {
      return res.send({ error: "No hay foto" })
    }
    const documentPath = `/documents/${req.file.filename}`
    const newDocument = await UserService.update(userId, {
      document: documentPath
    });
    res.send({ status: "success", message: "foto subida" })
  } catch (error) {
    return res.send({ error: "Error subiendo la foto" })
  }

};

export const getAllUsersController = async (req, res) => {
  const result = await UserService.getAll()
  console.log(result)
  const miresult = result.map(elemento => new UserPrincipalDTO(elemento))
  res.send({ payload: miresult })
}

export const deleteAllInactiveUsersController = async (req, res) => {

  const twoDaysAgo = subMinutes(new Date(), 10); // Calcula la fecha hace 2 días
  //const twoDaysAgo = subDays(new Date(), 2); // Calcula la fecha hace 2 días
  try {
    const usersToDelete = await UserService.getInactives(twoDaysAgo)
    const result = await UserService.cleanInactiveUsers(twoDaysAgo)
    for (const userToDelete of usersToDelete) {
      await sendGenericEmail( 
        userToDelete.email,
        'Eliminado por Inactividad',
        `${userToDelete.first_name} tu usuario ha sido eliminado por inactividad`
        )
      await CartService.deleteCart(userToDelete.cart);      
    }


   // console.log(result)
   res.send({ message: `${result.deletedCount} usuarios eliminados.` })
  
  } catch (error) {
    console.log(error)
    res.send({ error: error.message })
  }
};



