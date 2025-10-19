const Cliente = require('../models/Cliente');

// ✅ POST - Cadastrar cliente (status 200 sem resposta no corpo)
exports.createCliente = async (req, res) => {
  console.log('📝 CREATE CLIENTE - Iniciando...');
  try {
    const { nome, sobreNome } = req.body;
    
    console.log('Dados recebidos:', { nome, sobreNome });
    
    // Validação
    if (!nome || !sobreNome) {
      return res.status(400).json({ 
        error: 'Campos "nome" e "sobreNome" são obrigatórios' 
      });
    }
    
    const cliente = new Cliente({
      nome,
      sobreNome,
    });
    
    const createdCliente = await cliente.save();
    console.log('✅ Cliente criado com ID:', createdCliente._id);
    
    // Conforme especificado: status 200 sem corpo de resposta
    res.status(200).send();
    
  } catch (error) {
    console.log('❌ Erro ao criar cliente:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET - Listar todos os clientes
exports.getClientes = async (req, res) => {
  console.log('📋 GET CLIENTES - Buscando todos...');
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    
    // Formatar resposta conforme especificado
    const clientesFormatados = clientes.map(cliente => ({
      _id: cliente._id.toString(),
      nome: cliente.nome,
      sobreNome: cliente.sobreNome
    }));
    
    console.log(`✅ Encontrados ${clientesFormatados.length} clientes`);
    res.json(clientesFormatados);
    
  } catch (error) {
    console.log('❌ ERRO ao buscar clientes:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET - Buscar cliente por ID
exports.getClienteById = async (req, res) => {
  console.log('🔍 GET CLIENTE BY ID - Buscando:', req.params.id);
  try {
    const cliente = await Cliente.findById(req.params.id);
    
    if (cliente) {
      console.log('✅ Cliente encontrado:', cliente.nome);
      
      // Formatar resposta
      const clienteFormatado = {
        _id: cliente._id.toString(),
        nome: cliente.nome,
        sobreNome: cliente.sobreNome
      };
      
      res.json(clienteFormatado);
    } else {
      console.log('❌ Cliente não encontrado');
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.log('❌ Erro ao buscar cliente por ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ PUT - Atualizar cliente (retorna dados atualizados)
exports.updateCliente = async (req, res) => {
  console.log('🔄 UPDATE CLIENTE - Atualizando:', req.params.id);
  try {
    const { nome, sobreNome } = req.body;
    
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID do cliente é obrigatório' });
    }
    
    const cliente = await Cliente.findById(req.params.id);
    
    if (cliente) {
      // Atualiza apenas os campos fornecidos
      if (nome) cliente.nome = nome;
      if (sobreNome) cliente.sobreNome = sobreNome;
      
      const updatedCliente = await cliente.save();
      console.log('✅ Cliente atualizado:', updatedCliente.nome);
      
      // Retorna os dados atualizados conforme especificado
      res.json({
        _id: updatedCliente._id.toString(),
        nome: updatedCliente.nome,
        sobreNome: updatedCliente.sobreNome
      });
      
    } else {
      console.log('❌ Cliente não encontrado para atualização');
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.log('❌ Erro ao atualizar cliente:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE - Remover cliente (status 200 sem resposta no corpo)
exports.deleteCliente = async (req, res) => {
  console.log('🗑️ DELETE CLIENTE - Removendo:', req.params.id);
  try {
    const cliente = await Cliente.findById(req.params.id);
    
    if (cliente) {
      await cliente.deleteOne();
      console.log('✅ Cliente removido:', cliente.nome);
      
      // Conforme especificado: status 200 sem corpo de resposta
      res.status(200).send();
    } else {
      console.log('❌ Cliente não encontrado para exclusão');
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.log('❌ Erro ao deletar cliente:', error.message);
    res.status(500).json({ message: error.message });
  }
};