const mongoose = require('mongoose');

// Tipos de posts aceitos
const typeTags = ['ajuda', 'oferta'];

// Tipos de animais aceitos
const animalTags = ['cachorro', 'gato', 'passaro', 'roedor', 'outro'];

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
   * Atualiza um post, identificado por postId.
   * 
   * @param {string} postId Id do post a ser atualizado
   * @param {string} descricao descricao do post
   * @param {string} titulo titulo do post
   * @param {string} typeTag tipo do post, deve ser um tipo contido em typeTags
   * @param {string} animalTag tipo de animal do post, deve ser um tipo contido em animalTags
   * @returns false caso tenha ocorrido algm problema com o armazenamento, post se tudo ocorreu bem.
   */
  async updatePost(postId, descricao, titulo, typeTag, animalTag) {
    if (typeof postId !== 'string') {
      console.log('postId deve ser uma string');
      return false;
    }
    if (typeof descricao !== 'string') {
      console.log('descricao deve ser uma string');
      return false;
    }
    if (typeof titulo !== 'string') {
      console.log('titulo deve ser uma string');
      return false;
    }
    if (typeof typeTag !== 'string') {
      console.log('typeTag deve ser uma string');
      return false;
    }
    if (!typeTags.includes(typeTag)) {
      console.log('typeTag deve ser um dos tipos do array typeTags.');
      return false;
    }
    if (typeof animalTag !== 'string') {
      console.log('animalTag deve ser uma string');
      return false;
    }
    if (!animalTags.includes(animalTag)) {
      console.log('animalTag deve ser um dos tipos do array animalTags.');
      return false;
    }

    descricao = descricao.trim();
    titulo = titulo.trim();

    const post = await (await postModel.findByIdAndUpdate(postId, {
      descricao,
      titulo,
      typeTag,
      animalTag
    }, {
      new: true
    })).populate({
      path: 'user',
      select: '-senha'
    });

    return post;
  }

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
   * @returns false se o post não existe e o próprio post excluido se existia.
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
   * @pre userId deve ser de um usuário existente.
   * @param {string} userId Id do usuario
   * @param {string} descricao descricao do post
   * @param {string} titulo titulo do post
   * @param {string} typeTag Tag para o tipo do post
   * @param {string} animalTag Tag para o animal
   * @returns false se algo deu errado, post criado senão
   */
  async createPost(userId, descricao, titulo, typeTag, animalTag) {
    if (typeof userId !== 'string') {
      console.log('userId deve ser uma string');
      return false;
    }
    if (typeof descricao !== 'string') {
      console.log('descricao deve ser uma string');
      return false;
    }
    if (typeof titulo !== 'string') {
      console.log('titulo deve ser uma string');
      return false;
    }
    if (typeof typeTag !== 'string') {
      console.log('typeTag deve ser uma string');
      return false;
    }
    if (!typeTags.includes(typeTag)) {
      console.log('typeTag deve ser um dos tipos do array typeTags.');
      return false;
    }
    if (typeof animalTag !== 'string') {
      console.log('animalTag deve ser uma string');
      return false;
    }
    if (!animalTags.includes(animalTag)) {
      console.log('animalTag deve ser um dos tipos do array animalTags.');
      return false;
    }

    descricao = descricao.trim();
    titulo = titulo.trim();

    const post = await (await postModel.create({
      descricao,
      titulo,
      user: userId,
      typeTag,
      animalTag
    })).populate({
      path: 'user',
      select: '-senha'
    });

    return post;
  }

}

module.exports = new Post();