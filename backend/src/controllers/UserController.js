const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

class UserController {
  async createUser(req, res) {
    try {
      const {
        login,
        senha,
        confirmSenha,
        nome,
        email,
        telefone,
      } = req.body;

      const valid = await User.validateUser(login, senha, confirmSenha, nome, email, telefone);

      if (valid !== true) {
        return res.status(422).json(valid);
      }

      console.log(`Usuario ${login} validado`);

      const senhaHash = await User.encryptSenha(senha);

      User.dbStore(login, senhaHash, nome, email, telefone)
        .then(res.status(201).json({
          msg: 'Usuário cadastrado com sucesso!'
        }));

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
      });
    }
  }

  async authUser(req, res) {
    try {
      const {
        login,
        senha
      } = req.body;

      const valid = User.validateLogin(login, senha);

      if (valid !== true) {
        return res.status(422).json(valid);
      }

      const usuario = await User.loginExists(login);

      if (usuario === false) {
        return res.status(404).json({
          msg: 'Login ou Senha inválidos.'
        });
      }

      console.log(`Login ${login} validado`);

      const checkSenha = await User.checkSenha(usuario, senha);

      if (!checkSenha) {
        return res.status(404).json({
          msg: 'Login ou Senha inválidos.'
        });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign({
          id: usuario._id,
        },
        secret
      );

      return res.status(200).json({
        msg: 'Autenticação realizada com sucesso',
        token
      })

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
      });
    }
  }

  async getUser(req, res) {
    console.log('Chegou aqui');

    // Enviado da URL
    const login = req.params.login;

    const user = await User.getUserByLogin(login);

    if (user === false) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      });
    }

    return res.status(202).json({
      user
    });
  }

  async updateUser(req, res) {
    try {
      const {
        login,
        senha,
        confirmSenha,
        nome,
        email,
        telefone
      } = req.body;

      const valid = await User.validateUser(login, senha, confirmSenha, nome, email, telefone);
      if (valid !== true) {
        return res.status(422).json(valid);
      }

      const user = await User.updateUserByLogin(login, senha, nome, email, telefone)
      if (user === false) {
        return res.status(404).json({
          msg: 'Usuário não encontrado'
        });
      }

      return res.status(201).json({
        msg: 'Usuário atualizado com sucesso'
      });

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
      });
    }
  }
}

module.exports = new UserController();