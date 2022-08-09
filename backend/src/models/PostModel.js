const mongoose = require('mongoose');
const User = require('../models/UserModel');

const typeTags = ['ajuda', 'oferta'];
const animalTags = ['cachorro', 'gato', 'passaro', 'roedor'];

const postSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  typeTag: {
    type: String,
    require: true,
    lowercase: true,
    enum: typeTags
  },
  animalTag: {
    type: String,
    require: true,
    lowercase: true,
    enum: animalTags
  }
});

const postModel = mongoose.model('Post', postSchema);

class Post {

  /**
   * Busca todos os posts contendo a tag animalTag.
   * 
   * @param {string} animalTag tag do tipo do animal, deve respeitar um dos tipos em animalTags.
   * @returns false se houve um problema nos parametros, posts senão.
   */
  async getPostsByAnimalTag(animalTag) {
    if (typeof animalTag !== 'string') {
      console.log('animalTag deve ser uma string');
      return false;
    }
    if (!animalTags.includes(animalTag)) {
      console.log('animalTag deve ser um dos tipos do array animalTags.');
      return false;
    }

    const posts = await postModel.find({
      animalTag
    }).populate({
      path: 'user',
      select: '-senha'
    });

    return posts;
  }

  /**
   * Busca todos os posts correspondentes à tag de tipo.
   * 
   * @param {string} typeTag tipo do post, deve respeitar os tipos aceitos
   * @returns false se houve um problema nos parametros, posts senão.
   */
  async getPostsByTypeTag(typeTag) {
    if (typeof typeTag !== 'string') {
      console.log('typeTag deve ser uma string');
      return false;
    }
    if (!typeTags.includes(typeTag)) {
      console.log('typeTag deve ser um dos tipos do array typeTags.');
      return false;
    }

    const posts = await postModel.find({
      typeTag
    }).populate({
      path: 'user',
      select: '-senha'
    });

    return posts;
  }

  /**
   * Busca todos os posts correspondentes à ambas as tags,
   * typeTag e animalTag.
   * 
   * @param {string} typeTag tipo do post, deve respeitar os tipos aceitos
   * @param {string} animalTag tipo do animal, deve respeitar os tipos aceitos
   * @returns false se houve um problema nos parametros, posts senão.
   */
  async getPostsByBothTags(typeTag, animalTag) {
    if (typeof typeTag !== 'string') {
      console.log('typeTag deve ser uma string');
      return false;
    }
    if (typeof animalTag !== 'string') {
      console.log('animalTag deve ser uma string');
      return false;
    }
    if (!typeTags.includes(typeTag)) {
      console.log('typeTag deve ser um dos tipos do array typeTags.');
      return false;
    }
    if (!animalTags.includes(animalTag)) {
      console.log('animalTag deve ser um dos tipos do array animalTags.');
      return false;
    }

    const posts = await postModel.find({
      typeTag,
      animalTag
    }).populate({
      path: 'user',
      select: '-senha'
    });

    return posts;
  }

  /**
   * Busca todos os posts cadastrados.
   * 
   * @returns Todos os posts cadastrados no sistema, com as informações do usuário,
   * menos sua senha.
   */
  async getAllPosts() {
    const posts = await postModel.find().populate({
      path: 'user',
      select: '-senha'
    });

    return posts;
  }

  /**
   * Deleta um post do banco de dados.
   * 
   * @param {string} postId Id do post a ser deletado
   * @returns false se o post não existe e o post excluido se existia.
   */
  async deletePost(postId) {
    const post = await postModel.findByIdAndDelete(postId);

    // Post não existe ou já foi excluido
    if (post === null) {
      console.log(`Post ${postId} não encontrado`)
      return false;
    }

    return post;
  }

  /**
   * Verifica se descricao e titulo estão sendo informados
   * corretamente.
   * 
   * @param {*} descricao 
   * @param {*} titulo 
   * @returns true se estão sendo informados, um objeto com uma mensagem de erro senão.
   */
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

  /**
   * Cria um post no banco de dados.
   * 
   * @param {string} userId Id do usuario
   * @param {string} descricao descricao do post
   * @param {string} titulo titulo do post
   * @param {string} typeTag Tag para o tipo do post
   * @param {string} animalTag Tag para o animal
   * @returns false se algo deu errado, post criado senão
   */
  async createPost(userId, descricao, titulo, typeTag, animalTag) {
    const user = await User.idExists(userId);
    if (user === false) {
      console.log('Usuario nao encontrado');
      return false;
    }
    descricao = descricao.trim();
    titulo = titulo.trim();

    let post = null;
    try {
      post = await postModel.create({
        descricao,
        titulo,
        user: userId,
        typeTag,
        animalTag
      });
    } catch (erro) {
      console.log('Tag invalida.');
      return false;
    }

    if (post === null) {
      console.log('Falha ao armazenar o post.');
      return false;
    }

    await user.posts.push(post);
    await user.save();

    post = await post.populate({
      path: 'user',
      select: '-senha'
    });

    return post;
  }

}

module.exports = new Post();