// Body-Parser
const multer = require('multer');

const path = require('path');
const fs = require('fs');

// Diretório para salvar temporariamente as imagens
const destTempDir = "temp"
// Caminho temporário completo
const destTempPath = `./${destTempDir}`
const upload = multer({
  dest: destTempPath
})

// Diretório definitivo de arquivo de imagens
const definitiveDir = "images"
// Caminho definitivo completo
const definitivePath = `../${definitiveDir}/`

// Nome do atributo esperado no body para a imagem
const attName = 'image';

/**
 * Auxilia no suporte à conversão e armazenamento
 * de imagens passadas pelo body da requisição
 * 
 * @param {Object} req Requisição
 * @param {Object} res Response
 * @param {function} next Função callback
 */
function handleImage(req, res, next) {

  try {
    fs.mkdirSync(`./`, {
      recursive: true
    });



    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, definitivePath);
    console.log(targetPath)

    if (path.extname(req.file.originalname).toLowerCase() === '.jpeg') {
      targetPath.concat(req.file.originalname);
      fs.rename(tempPath, targetPath, () => {
        console.log('Imagem salva com sucesso!');
      });
      next();
    } else {
      fs.unlink(tempPath, () => {
        return res.status(403).json({
          msg: 'Apenas imagens .jpeg são aceitas'
        });
      })
    }
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({
      msg: 'Ocorreu um erro no servidor, tente novamente mais tarde'
    });
  }
}

exports.handleImage = handleImage;