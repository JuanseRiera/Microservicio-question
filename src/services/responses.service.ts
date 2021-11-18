import { IResponse, Response } from "../models";

export interface ResponseRequest {
  description: string;
  idUser: string;
  idQuestion: string;
}

export async function createResponseService(body: ResponseRequest) {
  return new Promise<IResponse>((resolve, reject) => {
    try {
      const response = <IResponse>new Response();
      response.question = body.idQuestion;
      response.idUser = body.idUser;
      response.description = body.description;
      response.initDate = new Date();

      // Then save the response
      response.save(function (err: any) {
        if (err) reject(err);
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function editResponseService(id: string, data: any) {
  return Response.findByIdAndUpdate(id, data, { new: true });
}

export function findResponseService(id: string) {
  return Response.findById(id);
}
