import express from 'express';
import { UserService } from "../repositories/index.js";
import { configureMulter } from '../utils.js';
import { deleteOne,getAllUsersController, setDocumentsUsersController, setPhotoProfileUsersController, deleteAllInactiveUsersController } from '../controllers/user.controller.js';
const uploadProfilePhoto = configureMulter('img/profile');
const uploadDocuments = configureMulter('documents');
const router = express.Router();
router.post('/:id/documents', uploadDocuments.single('document'), setDocumentsUsersController)
router.post('/:id/profiles', uploadProfilePhoto.single('photo'), setPhotoProfileUsersController)


router.get('/premium/:uid', async (req, res) => {
  try {
    const user = await UserService.getById(req.params.uid)
    if (!user) {
      return res.status(404).json({ message: 'error/userNotFound' });
    }
    if (user.document?.length > 0 && user.photo?.length > 0) {
      // await UserService.update(req.params.uid, { role: user.role === 'user' ? 'premium' : 'user' })
      await UserService.update(req.params.uid, { role: 'premium' })
      res.json({ status: 'success', message: 'Se ha actualizado el rol del usuario' })
    } else {
      res.status(400).json({ message: 'documentación de fotos incompleta' });
    }

  } catch (err) {
    res.json({ status: 'error', error: err.message })
  }
})

router.get('/', getAllUsersController)
router.delete('/', deleteAllInactiveUsersController)
router.delete('/delete/:id',deleteOne)

export default router;
