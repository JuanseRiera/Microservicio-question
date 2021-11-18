import express from "express";
import cors from "cors";
import dbConnection from "../database/config.db";
import * as logoutService from "../rabbit/logoutService";

class pathModel {
  questions: string = "/v1/questions";
  responses: string = "/v1/responses";
}
export class Server {
  app: any;
  port: string | undefined;
  path: pathModel = new pathModel();
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Conectar a bd
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas app
    this.routes();
    //Rabbit
    this.rabbit();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.path.questions, require("../routes/questions.routes"));
    this.app.use(this.path.responses, require("../routes/responses.routes"));
  }

  rabbit() {
    logoutService.init();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en ", this.port);
    });
  }
}
