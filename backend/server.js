const app = require('./App');


require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conexão com a base de dados estabelecida.');
    app.emit('DatabaseOn');
  })
  .catch((e) => {
    console.log('Não foi possível conectar à base de dados.');
    console.log(e);
  });

const port = 3000;
app.on('DatabaseOn', () => {
  app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
});