import { Request, Response } from "express";
import * as error from "../helper/errors";
import {
  editQuestionService,
  findQuestionService,
} from "../services/questions.service";
import {
  createResponseService,
  editResponseService,
  findResponseService,
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
        message: "La pregunta ya ha sido respondida",
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
  const { idRespuesta } = req.params;
  let idUser = usuarioAutenticado.user.id;

  if (!id || !idRespuesta || id !== idRespuesta) {
    res.status(406).json({
      message: "Los ids enviados deben coincidir",
    });
    return;
  }

  try {
    let previousResponse = await findResponseService(id);

    if (!previousResponse) {
      res.status(406).json({
        message: "No existe la respuesta proporcionada",
      });
      return;
    }

    if (previousResponse.endDate) {
      res.status(406).json({
        message: "No se puede editar una pregunta que ya ha sido eliminada",
      });
      return;
    }

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
    let previousResponse = await findResponseService(id);

    if (!previousResponse) {
      res.status(406).json({
        message: "No existe la respuesta proporcionada",
      });
      return;
    }

    if (previousResponse.endDate) {
      res.status(406).json({
        message: "La respuesta ya había sido eliminada",
      });
      return;
    }

    let response = await editResponseService(id, {
      endDate: new Date(),
      deletedBy: idUser,
    });

    if (!response) {
      res.status(406).json({
        message: "No existe la respuesta proporcionada",
      });
      return;
    }

    let question = await editQuestionService(response.question.toString(), {
      response: null,
    });

    res.status(200).json({
      message: "Se eliminó la respuesta correctamente",
      response,
      question,
    });
  } catch (err) {
    error.handle(res, err);
  }
}
