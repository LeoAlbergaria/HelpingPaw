const User = require('../models/UserModel');

class UserController {
  async createUser(req, res) {
    const {
      login, senha, confirmSenha, nome, telefone,
    } = req.body;
    try {
      const user = new User(login, senha, confirmSenha, nome, telefone);
      // Armazena na base de dados
      user.dbStore();

      // Envia o user para o front
      res.json(user);
      
      return user;
    } catch (erro) {
      res.status(422).json({ msg: erro });
      return null;
    }
  }
}

module.exports = new UserController();
