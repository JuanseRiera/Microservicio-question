import { Request, Response } from "express";
import {
  createQuestionService,
  deleteQuestionPermanentlyService,
  deleteQuestionService,
  editQuestionService,
  findQuestionService,
  findQuestionsOfArticleService,
} from "../services/questions.service";
import * as error from "../helper/errors";
import { buscarArticulo } from "../services/microserviciocatalog.service";

export async function createQuestion(request: Request, response: Response) {
  const { idArticle, description, usuarioAutenticado } = request.body;
  let idUser = usuarioAutenticado.user.id;

  try {
    let question = await createQuestionService({
      idUser,
      idArticle,
      description,
    });

    buscarArticulo(idArticle, usuarioAutenticado.token).then(
      (response) => {
        //realizar validaciones
        let article = response.result;
        if (article.enabled) {
          return;
        }
        deleteQuestionPermanentlyService(question.id).catch((err) =>
          console.log(err)
        );
      },
      (error) => {
        //Eliminar question
        deleteQuestionPermanentlyService(question.id).catch((err) =>
          console.log(err)
        );
      }
    );

    response.status(200).json({
      message: "Se registró la pregunta correctamente",
      question,
    });
  } catch (err) {
    error.handle(response, err);
  }
}

export async function editQuestion(request: Request, response: Response) {
  const { id, description, usuarioAutenticado } = request.body;
  let idUser = usuarioAutenticado.user.id;

  try {
    let perviousQuestion = await findQuestionService(id);
    if (perviousQuestion && perviousQuestion.response) {
      response.status(406).json({
        message: "No se puede editar una pregunta que ya tiene respuesta",
      });
      return;
    }

    if (perviousQuestion && perviousQuestion.idUser !== idUser) {
      response.status(406).json({
        message: "Solo el usuario que creó la pregunta la puede editar",
      });
      return;
    }

    if (perviousQuestion && perviousQuestion.endDate) {
      response.status(406).json({
        message: "No se puede editar una pregunta que ya había sido eliminada",
      });
      return;
    }

    let question = await editQuestionService(id, {
      description,
      edited: new Date(),
    });

    response.status(200).json({
      message: "Se editó la pregunta correctamente",
      question,
    });
  } catch (err) {
    error.handle(response, err);
  }
}

export async function deleteQuestion(request: Request, response: Response) {
  const { usuarioAutenticado } = request.body;
  const { id } = request.params;
  let idUser = usuarioAutenticado.user.id;

  try {
    let perviousQuestion = await findQuestionService(id);

    if (perviousQuestion && perviousQuestion.idUser !== idUser) {
      response.status(406).json({
        message: "Solo el usuario que creó la pregunta la puede borrar",
      });
      return;
    }
    let question = await deleteQuestionService(id);

    response.status(200).json({
      message: "Se eliminó la pregunta correctamente",
      question,
    });
  } catch (err) {
    error.handle(response, err);
  }
}

export async function findArticleQuestions(
  request: Request,
  response: Response
) {
  const { idArticle } = request.params;
  try {
    let questions = await findQuestionsOfArticleService(idArticle);

    response.status(200).json({
      questions,
    });
  } catch (err) {
    error.handle(response, err);
  }
}
