import { NextFunction, Request, Response } from "express";
import * as error from "../helper/errors";
import * as token from "../token";
import nodeCache from "node-cache";

const sessionCache = new nodeCache({ stdTTL: 3600, checkperiod: 60 });

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return error.handle(
      res,
      error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized")
    );
  }

  token
    .validate(auth)
    .then((usuarioAutenticado) => {
      req.body = { ...req.body, usuarioAutenticado };
      next();
    })
    .catch((err) => error.handle(res, err));
};

const validarAdminJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return throwUnauthorizedError(res);
  }

  const cachedSession: any = sessionCache.get(auth);

  if (cachedSession == null) {
    return throwUnauthorizedError(res);
  }

  if (!cachedSession.permissions.contains("admin")) {
    return throwUnauthorizedError(res);
  }

  next();
};

const throwUnauthorizedError = (res: Response) => {
  return error.handle(
    res,
    error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized")
  );
};

export { validarJWT, validarAdminJWT };
