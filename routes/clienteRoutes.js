const express = require('express');
const router = express.Router();
const {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} = require('../controllers/clienteController');

// ✅ Rotas conforme especificação
router.post('/', createCliente);        // POST - Criar cliente
router.get('/', getClientes);           // GET - Listar todos clientes  
router.get('/:id', getClienteById);     // GET - Buscar cliente por ID
router.put('/:id', updateCliente);      // PUT - Atualizar cliente
router.delete('/:id', deleteCliente);   // DELETE - Remover cliente

module.exports = router;