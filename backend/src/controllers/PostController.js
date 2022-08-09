const Post = require('../models/PostModel');
const User = require('../models/UserModel');

class PostController {

  /**
   * Responde com todos os posts, com as informacoes do usuario de cada post
   * menos sua senha.
   * 
   * @param {Object} req Requisição
   * @param {Object} res Response
   */
  async getAllPosts(req, res) {
    try {
      const posts = await Post.getAllPosts();

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
      const {
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

      const post = await Post.createPost(userId, descricao, titulo, typeTag, animalTag);

      if (post === false) {
        return res.status(422).json({
          msg: 'Nao foi possivel criar o post.'
        });
      }

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