import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { Router } from 'express';
import { getMensaje, getMensajes, postMensaje, putMensaje, unblockMensaje } from '../controllers/mensajes';
import { check } from 'express-validator';
import { esMensajeIDValido } from '../helpers/db-validators';


const router = Router();

router.get('/', getMensajes);
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIDValido),
    validarCampos
], getMensaje);
router.post('/',[
    validarJWT,
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
], postMensaje);
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIDValido),
    validarCampos
], putMensaje);
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIDValido),
    validarCampos
], unblockMensaje);




module.exports = router;