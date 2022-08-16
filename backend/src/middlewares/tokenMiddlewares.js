const jwt = require('jsonwebtoken');

/**
 * Verifica a validade de um Bearer token enviado pelo header da
 * requisição. 
 * 
 * @param {Object} req Requisição
 * @param {Object} res Response
 * @param {function} next Função de callback
 * @returns status 401, 400 ou 500 com uma mensagem de erro caso ocorra,
 * senão apenas chama a função passada pelo next como callback.
 */
function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  try {

    if (!token) {
      return res.status(401).json({
        msg: 'Acesso negado!'
      });
    }
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({
      msg: 'Ocorreu um problema com o servidor. Tente novamente mais tarde.'
    });
  }

  try {

    const secret = process.env.SECRET;
    console.log('Verificando token...');

    // Caso não passe na verificação, vai pro catch
    const data = jwt.verify(token, secret);

    req.tokenId = data.id;

    next();

  } catch (erro) {
    console.log(erro);
    res.status(400).json({
      msg: 'Token inválido!'
    });
  }

}

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET);
}

exports.generateToken = generateToken;
exports.checkToken = checkToken;