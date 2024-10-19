import { Router } from 'express';
import { deleteRol, getRol, getRoles, newRol, updateRol } from '../controllers/rolController';

const router = Router();

router.post('/', newRol as any);
router.put('/update', updateRol as any);
router.delete('/delete/:id_rol', deleteRol as any);
router.get('/list', getRoles as any);
router.get('/:id_rol', getRol as any);


export default router;