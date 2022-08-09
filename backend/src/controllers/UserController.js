const User = require('../models/UserModel');
const Post = require('../models/PostModel');

const {
  generateToken
} = require('../middlewares/tokenMiddlewares');

class UserController {

  async deleteUser(req, res) {
    const userId = req.params.userId;

    const user = await User.deleteUser(userId);
    // Remove os posts
    for (let post of user.posts) {
      await Post.deletePost(post);
    }

    return res.status(200).json(user);
  }

  /**
   * Controla a rota de requisitar
   * todos os usuários além do próprio
   * que fez a requisição.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   */
  async getOtherUsers(req, res) {
    try {
      const {
        userId
      } = req.body;

      if (!userId) {
        return res.status(422).json({
          msg: 'Insira o userId no body'
        });
      }

      const users = await User.getOtherUsers(userId);
      return res.status(202).json(users);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
      });
    }

  }

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

      const checkLogin = await User.loginExists(login);
      const checkEmail = await User.emailExists(email);

      if (checkLogin !== false) {
        return res.status(422).json({
          msg: 'Login em uso'
        });
      }

      if (checkEmail !== false) {
        return res.status(422).json({
          msg: 'E-mail em uso'
        });
      }


      console.log(`Usuario ${login} validado`);

      const senhaHash = await User.encryptSenha(senha);

      const usuario = await User.createUser(login, senhaHash, nome, email, telefone);

      const token = generateToken({
        id: usuario._id
      });

      res.status(201).json({
        userId: usuario._id,
        msg: 'Usuário cadastrado com sucesso!',
        token
      });

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

      const token = generateToken({
        id: usuario._id
      });

      return res.status(200).json({
        userId: usuario._id,
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
    try {
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
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
      });
    }
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
        userId: user._id,
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