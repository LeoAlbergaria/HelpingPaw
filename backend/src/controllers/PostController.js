const Post = require('../models/PostModel');
const User = require('../models/UserModel');

class PostController {
  async createPost(req, res) {
    try {
      const {
        userId,
        descricao,
        titulo
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

      const valid = Post.validatePost(descricao, titulo);
      if (valid !== true) {
        return res.status(422).json(valid);
      }

      const post = await Post.createPost(userId, descricao, titulo);

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
      return res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
      });
    }
  }
}

module.exports = new PostController();