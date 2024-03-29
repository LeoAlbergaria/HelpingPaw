const Post = require('../models/PostModel');
const User = require('../models/UserModel');

class PostController {

  /**
   * Responde com o post com id correspondente.
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns post, ou mensagem de erro.
   */
  async getPost(req, res) {
    try {
      const postId = req.params.postId;

      const post = await Post.getPost(postId);

      if (post === null) {
        return res.status(404).json({
          msg: 'Post não encontrado'
        });
      }

      return res.status(200).json(post);

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }

  }

  /**
   * Atualiza as informações de um post.
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @returns 
   */
  async updatePost(req, res) {
    try {
      let {
        postId,
        titulo,
        descricao,
        typeTag,
        animalTag
      } = req.body;

      if (!postId) {
        return res.status(422).json({
          msg: 'Insira postId no body'
        });
      }
      if (!titulo) {
        return res.status(422).json({
          msg: 'Insira titulo no body'
        });
      }
      if (!descricao) {
        return res.status(422).json({
          msg: 'Insira descricao no body'
        });
      }
      if (!animalTag) {
        return res.status(422).json({
          msg: 'Insira animalTag no body'
        });
      }
      if (!typeTag) {
        return res.status(422).json({
          msg: 'Insira typeTag no body'
        });
      }

      const userId = await Post.findPostUserId(postId);
      if (userId !== req.tokenId) {
        return res.status(401).json({
          msg: 'Não autorizado'
        });
      }

      titulo = titulo.trim();
      descricao = descricao.trim();

      const post = await Post.updatePost(postId, descricao, titulo, typeTag, animalTag);

      if (post === false) {
        return res.status(422).json({
          msg: 'Não foi possível atualizar o post.'
        });
      }

      return res.status(202).json(post);

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }

  }

  /**
   * Responde com todos os posts, com as informacoes do usuario de cada post
   * menos sua senha.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   */
  async getAllPosts(req, res) {
    try {
      let posts = null;
      const {
        typeTag,
        animalTag
      } = req.body;

      if (!typeTag && !animalTag) {
        posts = await Post.getAllPosts();
      } else if (!typeTag) {
        posts = await Post.getPostsByAnimalTag(animalTag);
      } else if (!animalTag) {
        posts = await Post.getPostsByTypeTag(typeTag);
      } else {
        posts = await Post.getPostsByBothTags(typeTag, animalTag);
      }

      if (posts === false) {
        return res.status(422).json({
          msg: 'Preencha os parâmetros corretamente'
        });
      }

      return res.status(200).json(posts);

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }
  }

  /**
   * Deleta um post do usuário, removendo
   * seu registro do array do usuário também.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   */
  async deletePost(req, res) {
    try {
      const postId = req.params.postId;

      const userId = await Post.findPostUserId(postId);
      if (userId !== req.tokenId) {
        return res.status(401).json({
          msg: 'Não autorizado'
        });
      }


      const post = await Post.deletePost(postId);

      if (post === false) {
        return res.status(404).json({
          msg: 'Post não encontrado'
        });
      }

      await User.removePostFromArray(postId, post.user._id);

      return res.status(201).json({
        msg: 'Post deletado com sucesso'
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }
  }

  /**
   * Retorna resposta com todos os posts de um
   * usuário passado como parametro na rota.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   * @returns 
   */
  async getUserPosts(req, res) {
    try {
      // Enviado da URL
      const login = req.params.login;

      const user = await User.getUserByLogin(login);

      if (user === false) {
        return res.status(404).json({
          msg: 'Usuário não encontrado'
        });
      }

      const posts = (await user.populate({
        path: 'posts'
      }));

      return res.status(202).json(posts);

    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }
  }

  /**
   * Cria um post no banco de dados e retorna o mesmo
   * pro cliente.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   * @returns Apenas uma mensagem caso o post não tenha sido criado, caso contrário
   * retorna o post também.
   */
  async createPost(req, res) {
    try {
      let {
        userId,
        descricao,
        titulo,
        typeTag,
        animalTag
      } = req.body;

      if (!userId) {
        return res.status(422).json({
          msg: 'Insira o id do usuario no body'
        });
      }
      if (!titulo) {
        return res.status(422).json({
          msg: 'Insira o titulo no body'
        });
      }
      if (!descricao) {
        return res.status(422).json({
          msg: 'Insira a descricao no body'
        });
      }
      if (!typeTag) {
        return res.status(422).json({
          msg: 'Insira a typeTag no body'
        });
      }
      if (!animalTag) {
        return res.status(422).json({
          msg: 'Insira a animalTag no body'
        });
      }

      const valid = Post.validatePost(descricao, titulo);
      if (valid !== true) {
        return res.status(422).json(valid);
      }

      const user = await User.idExists(userId);
      if (user === false) {
        console.log('Usuario nao encontrado');
        return false;
      }

      titulo = titulo.trim();
      descricao = descricao.trim();

      const post = await Post.createPost(userId, descricao, titulo, typeTag, animalTag);

      if (post === false) {
        return res.status(422).json({
          msg: 'Nao foi possivel criar o post.'
        });
      }

      // Associa post ao usuario
      user.posts.push(post);
      await user.save();

      return res.status(201).json({
        post,
        msg: 'Post criado com sucesso!'
      });

    } catch (erro) {
      console.log(erro);
      console.log(typeof erro)
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }
  }
}

module.exports = new PostController();