import { validarCampos } from '../middlewares/validar-campos';
import { Router, Request, Response } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, unblockUsuario } from '../controllers/usuarios';
import { check } from 'express-validator';
import { esUsuarioIDValido, esNombreUsuarioValido, esUsuarioValidoUser } from '../helpers/db-validators';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esUsuarioIDValido),
    validarCampos
], getUsuario);
router.post('/',[
    check('nombre').not().isEmpty(),
    check('nombre').custom(esNombreUsuarioValido),
    check('usuario').not().isEmpty(),
    check('usuario').custom(esUsuarioValidoUser),
    validarCampos
], postUsuario);
router.put('/:id',
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esUsuarioIDValido),
    validarCampos
, putUsuario);
router.delete('/:id',
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esUsuarioIDValido),
    validarCampos
, unblockUsuario)

module.exports =router;