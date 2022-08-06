const express = require('express');
const postRoutes = require('./src/routes/postRoutes');
const userRoutes = require('./src/routes/userRoutes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({
      extended: true
    }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', userRoutes, postRoutes);
  }
}

module.exports = new App().app;