const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  atributo: { type: String, required: true },
  outraCoisa: Number,
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
  async criaHomeObj(atributo, outraCoisa) {
    HomeModel.create({
      atributo,
      outraCoisa,
    })
      .then((dados) => console.log(dados))
      .catch((e) => console.log(e));
  }
}

module.exports = new Home();
