const express = require('express');
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
    this.app.use('/', userRoutes);
  }
}

module.exports = new App().app;