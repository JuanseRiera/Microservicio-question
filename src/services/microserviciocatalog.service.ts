import { RestClient } from "typed-rest-client";
import * as error from "../helper/errors";

export async function buscarArticulo(idArticulo: string, token: string) {
  const restClient: RestClient = new RestClient(
    "GetArticle",
    process.env.catalogServer
  );

  return new Promise<any>((resolve, reject) => {
    restClient
      .get<any>("/v1/articles/" + idArticulo, {
        additionalHeaders: { Authorization: token },
      })
      .then((data) => {
        resolve(data);
      })
      .catch((exception) => {
        console.log(exception);
        reject(error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
      });
  });
}
