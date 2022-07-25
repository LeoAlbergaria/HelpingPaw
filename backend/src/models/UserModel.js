const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true }, // Criar um tipo específico para telefone
});

const userModel = mongoose.model('User', userSchema);

async function loginExists(login) {
  return (await userModel.findOne({ login: login }) !== null);
}

async function emailExists(email) {
  return (await userModel.findOne({ email: email }) !== null)
}





class User {

  async validateUser(login, senha, confirmSenha, nome, email, telefone) {
    if (!login || login === '' || login === undefined) {
      return { msg: 'Insira um login' };
    } else if (!(typeof login === 'string')) {
      return { msg: 'Login precisa ser uma String' };
    }
    if (!senha || senha === '' || senha === undefined) {
      return { msg: 'Insira uma senha' };
    } else if (!(typeof senha === 'string')) {
      return { msg: 'Senha precisa ser uma String' };
    }
    if (!confirmSenha || confirmSenha === '' || confirmSenha === undefined) {
      console.log('Missing confirmSenha parameter');
      return { msg: 'Insira uma senha para confirmar' };
    } else if (!(typeof confirmSenha === 'string')) {
      return { msg: 'confirmSenha precisa ser uma String' };
    }
    if (!nome || nome === '' || nome === undefined) {
      return { msg: 'Insira um nome' };
    } else if (!(typeof nome === 'string')) {
      return { msg: 'nome precisa ser uma String' };
    }
    if (!email || email === '' || email === undefined) {
      return { msg: 'Insira um email' };
    } else if (!(typeof email === 'string')) {
      return { msg: 'email precisa ser uma String' };
    }
    if (!telefone || telefone === '' || telefone === undefined) {
      return { msg: 'Insira um telefone' };
    } else if (!(typeof telefone === 'string')) { // TO DO Criar uma classe para o telefone
      return { msg: 'telefone precisa ser uma String' };
    }

    if (senha !== confirmSenha) {
      return { msg: 'Senhas não coincidem' };
    }

    const checkLogin = await loginExists(login);
    const checkEmail = await emailExists(email);

    if(checkLogin === true) {
      return { msg: 'Login em uso' };
    }

    if(checkEmail === true) {
      return { msg: 'E-mail em uso' };
    }

    return true;
  } 

  async encryptSenha(senha) {
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    return senhaHash;
  }

  async dbStore(login, senha, nome, email, telefone) {
    userModel.create({
      login,
      senha,
      nome,
      email,
      telefone,
    });
  }
}



module.exports = new User();
