const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    nome: { 
      type: String, 
      required: [true, 'O nome é obrigatório'],
      trim: true,
      minlength: [2, 'Nome muito curto'],
      maxlength: [100, 'Nome muito longo']
    },
    sobreNome: { 
      type: String, 
      required: [true, 'O sobrenome é obrigatório'],
      trim: true,
      minlength: [2, 'Sobrenome muito curto'],
      maxlength: [100, 'Sobrenome muito longo']
    }
  },
  {
    timestamps: true,
  });

// Índice para melhor performance
clienteSchema.index({ nome: 1, sobreNome: 1 });

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;