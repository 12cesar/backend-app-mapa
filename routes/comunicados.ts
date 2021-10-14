import { validarCampos } from '../middlewares/validar-campos';
import { Router, Response, Request } from 'express';
import { getComunicados, getComunicado, postComunicado, putComunicado, unblockComunicado } from '../controllers/comunicados';
import { validarJWT } from '../middlewares/validar-jwt';
import { check } from 'express-validator';
import { esComunicadoIDValido } from '../helpers/db-validators';

const router = Router();

router.get('/', getComunicados)
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esComunicadoIDValido),
    validarCampos
], getComunicado)
router.post('/',[
    validarJWT,
    validarCampos
], postComunicado)
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esComunicadoIDValido),
    validarCampos
], putComunicado)
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esComunicadoIDValido),
    validarCampos
], unblockComunicado)



module.exports = router;