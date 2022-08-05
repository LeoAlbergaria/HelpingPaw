const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// TO DO adicionar posts titulo e descrição
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  }, // Criar um tipo específico para telefone
});

const userModel = mongoose.model('User', userSchema);

class User {

  async updateUserByLogin(login, senha, nome, email, telefone) {
    const user = await userModel.findOneAndUpdate({
      login
    }, {
      login,
      senha,
      nome,
      email,
      telefone
    }, {
      new: true
    });

    return user === null ? false : user;
  }

  // Retorna falso se não existe usuário, retorna o usuário sem a senha caso contrário
  async getUserByLogin(login) {
    const user = await userModel.findOne({
      login
    }, '-senha');
    return user === null ? false : user;
  }

  // Retorna falso se não existe usuário, retorna o usuário caso contrário
  async loginExists(login) {
    const user = await userModel.findOne({
      login
    });
    return user === null ? false : user;
  }

  // Retorna falso se não existe usuário, retorna o usuário caso contrário
  async emailExists(email) {
    const user = await userModel.findOne({
      email
    });
    return user === null ? false : user;
  }

  // Retorna falso se não existe usuário, retorna o usuário caso contrário
  async idExists(id) {
    const user = await userModel.findById(id, '-senha');
    return user === null ? false : user;
  }

  // Verifica se a senha fornecida corresponde à senha do usuário
  async checkSenha(usuario, senha) {
    return await bcrypt.compare(senha, usuario.senha);
  }

  validateLogin(login, senha) {
    if (!login || login === '' || login === undefined) {
      return {
        msg: 'Insira um login'
      };
    } else if (!(typeof login === 'string')) {
      return {
        msg: 'Login precisa ser uma String'
      };
    }
    if (!senha || senha === '' || senha === undefined) {
      return {
        msg: 'Insira uma senha'
      };
    } else if (!(typeof senha === 'string')) {
      return {
        msg: 'Senha precisa ser uma String'
      };
    }

    return true;
  }

  async validateUser(login, senha, confirmSenha, nome, email, telefone) {

    this.validateLogin(login, senha);


    if (!confirmSenha || confirmSenha === '' || confirmSenha === undefined) {
      console.log('Missing confirmSenha parameter');
      return {
        msg: 'Insira uma senha para confirmar'
      };
    } else if (!(typeof confirmSenha === 'string')) {
      return {
        msg: 'confirmSenha precisa ser uma String'
      };
    }
    if (!nome || nome === '' || nome === undefined) {
      return {
        msg: 'Insira um nome'
      };
    } else if (!(typeof nome === 'string')) {
      return {
        msg: 'nome precisa ser uma String'
      };
    }
    if (!email || email === '' || email === undefined) {
      return {
        msg: 'Insira um email'
      };
    } else if (!(typeof email === 'string')) {
      return {
        msg: 'email precisa ser uma String'
      };
    }
    if (!telefone || telefone === '' || telefone === undefined) {
      return {
        msg: 'Insira um telefone'
      };
    } else if (!(typeof telefone === 'string')) { // TO DO Criar uma classe para o telefone
      return {
        msg: 'telefone precisa ser uma String'
      };
    }

    if (senha !== confirmSenha) {
      return {
        msg: 'Senhas não coincidem'
      };
    }

    const checkLogin = await this.loginExists(login);
    const checkEmail = await this.emailExists(email);

    if (checkLogin !== false) {
      return {
        msg: 'Login em uso'
      };
    }

    if (checkEmail !== false) {
      return {
        msg: 'E-mail em uso'
      };
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