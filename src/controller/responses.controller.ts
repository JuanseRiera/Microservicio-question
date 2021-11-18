import { Request, Response } from "express";
import * as error from "../helper/errors";
import {
  editQuestionService,
  findQuestionService,
} from "../services/questions.service";
import {
  createResponseService,
  editResponseService,
} from "../services/responses.service";

export async function createResponse(request: Request, res: Response) {
  const { description, idQuestion, usuarioAutenticado } = request.body;
  let idUser = usuarioAutenticado.user.id;

  try {
    let response = await createResponseService({
      idUser,
      description,
      idQuestion,
    });

    let perviousQuestion = await findQuestionService(idQuestion);

    if (!perviousQuestion) {
      res.status(406).json({
        message: "La pregunta indicada no existe",
      });
      return;
    }

    if (perviousQuestion.response) {
      res.status(406).json({
        message: "La pregunta ya había sido respondida",
      });
      return;
    }

    let question = await editQuestionService(idQuestion, {
      response: response.id,
    });

    res.status(200).json({
      message: "Se registró la respuesta correctamente",
      response,
      question,
    });
  } catch (err) {
    error.handle(res, err);
  }
}

export async function editResponse(req: Request, res: Response) {
  const { id, description, usuarioAutenticado } = req.body;
  let idUser = usuarioAutenticado.user.id;

  try {
    let response = await editResponseService(id, {
      description,
      edited: new Date(),
      editedBy: idUser,
    });

    res.status(200).json({
      message: "Se editó la respuesta correctamente",
      response,
    });
  } catch (err) {
    error.handle(res, err);
  }
}

export async function deleteResponse(req: Request, res: Response) {
  const { id } = req.params;
  let idUser = req.body.usuarioAutenticado.user.id;

  try {
    let response = await editResponseService(id, {
      endDate: new Date(),
      deletedBy: idUser,
    });

    res.status(200).json({
      message: "Se eliminó la respuesta correctamente",
      response,
    });
  } catch (err) {
    error.handle(res, err);
  }
}
