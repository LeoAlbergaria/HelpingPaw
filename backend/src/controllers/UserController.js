const User = require('../models/UserModel');

class UserController {
  async createUser(req, res) {
    try {
      const {
        login, senha, confirmSenha, nome, email, telefone,
      } = req.body;

      const valid = await User.validateUser(login, senha, confirmSenha, nome, email, telefone);
      // const msg = new User(login, senha, confirmSenha, nome, email, telefone);

      if(valid !== true) {
        res.status(422).json(valid);
        return;
      }

      console.log(`Usuario ${nome} validado`);

      const senhaHash = await User.encryptSenha(senha);

      User.dbStore(login, senhaHash, nome, email, telefone)
        .then(res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' }));

    } catch (erro) {
      console.log(erro);
      res.status(500).json({ msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.' });
    }
  }
}

module.exports = new UserController();
