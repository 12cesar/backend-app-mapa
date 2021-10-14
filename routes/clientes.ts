import { Router, Response, Request } from 'express';
import { getClientes, getCliente, postCliente, putCliente, unblockCliente } from '../controllers/clientes';


const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', unblockCliente);




module.exports = router;