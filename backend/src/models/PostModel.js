const mongoose = require('mongoose');
const User = require('../models/UserModel');

const postSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
});

const postModel = mongoose.model('Post', postSchema);

class Post {
  validatePost(descricao, titulo) {
    if (typeof descricao !== 'string') {
      return {
        msg: 'Descricao precisa ser uma string'
      }
    }
    if (typeof titulo !== 'string') {
      return {
        msg: 'Titulo precisa ser uma string'
      }
    }
    return true;
  }

  async createPost(userId, descricao, titulo) {
    const user = await User.idExists(userId);
    if (user === false) {
      console.log('Usuario nao encontrado');
      return false;
    }

    const post = await postModel.create({
      descricao,
      titulo,
      user: userId
    });

    if (post === null) {
      console.log('Falha ao armazenar o post.');
      return false;
    }

    user.posts.push(post);
    user.save();


    return post;
  }

}

module.exports = new Post();