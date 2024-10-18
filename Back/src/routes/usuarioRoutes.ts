import { Router } from 'express';
import { newUsuario, desactivarUsuario, activarUsuario, updateUsuario, loginUser } from '../controllers/usuarioController';

const router = Router();

router.post('/', newUsuario as any);
router.put('/desactivar/:id_usuario', desactivarUsuario as any);
router.put('/activar/:id_usuario', activarUsuario as any);
router.put('/update/:id_usuario', updateUsuario as any);
router.post('/login', loginUser as any);

export default router;