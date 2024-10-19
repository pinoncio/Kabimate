import { Router } from 'express';
import { deleteInstitucion, getInstitucion, getInstituciones, newInstitucion, updateInstitucion } from '../controllers/institucionController';

const router = Router();

router.post('/', newInstitucion as any);
router.put('/update/:id_institucion', updateInstitucion as any);
router.delete('/delete/:id_institucion', deleteInstitucion as any);
router.get('/list', getInstituciones as any);
router.get('/:id_institucion', getInstitucion as any);


export default router;