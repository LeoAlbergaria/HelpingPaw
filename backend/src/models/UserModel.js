function validateUser(login, senha, confirmSenha, nome, telefone) {
  if (!login || login === '' || login === undefined) {
    throw ('Insira um login');
  } else if (!(typeof login === 'string')) {
    throw ('Login precisa ser uma String');
  }
  if (!senha || senha === '' || senha === undefined) {
    throw ('Insira uma senha');
  } else if (!(typeof senha === 'string')) {
    throw ('Senha precisa ser uma String');
  }
  if (!confirmSenha || confirmSenha === '' || confirmSenha === undefined) {
    console.log('Missing confirmSenha parameter');
    throw ('Insira uma senha para confirmar');
  } else if (!(typeof confirmSenha === 'string')) {
    throw ('confirmSenha precisa ser uma String');
  }
  if (!nome || nome === '' || nome === undefined) {
    throw ('Insira um nome');
  } else if (!(typeof nome === 'string')) {
    throw ('nome precisa ser uma String');
  }
  if (!telefone || telefone === '' || telefone === undefined) {
    throw ('Insira um telefone');
  } else if (!(typeof telefone === 'string')) { // TO DO Criar uma classe para o telefone
    throw ('telefone precisa ser uma String');
  }

  return true;
}

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  telefone: { type: String, required: true }, // Criar um tipo específico para telefone
});

const userModel = mongoose.model('User', userSchema);

class User {
  constructor(login, senha, confirmSenha, nome, telefone) {
    validateUser(login, senha, confirmSenha, nome, telefone);
    if (senha !== confirmSenha) {
      throw ('Senhas não coincidem');
    }
    console.log(`Usuario ${nome} validado`);
    this.senha = senha;
    this.login = login;
    this.nome = nome;
    this.telefone = telefone;
  }

  async userExists() {
    const check = await userModel.findOne({ login: this.login });
  }

  async dbStore() {
    userModel.create({
      login: this.login,
      senha: this.senha,
      nome: this.nome,
      telefone: this.telefone,
    });
  }
}

module.exports = User;
