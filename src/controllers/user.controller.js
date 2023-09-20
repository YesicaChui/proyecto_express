import { UserService } from "../repositories/index.js";
import { UserPrincipalDTO } from "../dtos/userDTO.js";
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
  const miresult =result.map(elemento=>new UserPrincipalDTO(elemento))
  res.send({payload:miresult})
}