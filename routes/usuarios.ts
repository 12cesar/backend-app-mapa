import { Router, Request, Response } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, unblockUsuario } from '../controllers/usuarios';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', unblockUsuario)

module.exports =router;