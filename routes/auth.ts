import { validarCampos } from './../middlewares/validar-campos';
import { Router, Request, Response } from 'express';
import { postLogin } from '../controllers/auth';
import { check } from 'express-validator';


const router = Router();

router.post('/',[
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], postLogin)




module.exports = router;