const HomeModel = require('../models/HomeModel');

class HomeController {
  async index(req, res) {
    HomeModel.criaHomeObj('valor do atributo', 1);

    console.log('PASSOU AQUI');

    res.json({
      msg: "Nada a ser enviado"
    });
  }
}

module.exports = new HomeController();
