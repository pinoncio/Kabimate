import { Router } from 'express';
import { newUsuario, desactivarUsuario, activarUsuario, updateUsuario, loginUser } from '../controllers/usuarioController';

const router = Router();

router.post('/', newUsuario);
router.put('/desactivar/:id_usuario', desactivarUsuario);
router.put('/activar/:id_usuario', activarUsuario);
router.put('/update/:id_usuario', updateUsuario);
router.post('/login', loginUser);
export default router;