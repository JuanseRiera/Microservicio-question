import { Router } from "express";
import { check } from "express-validator";
import { responsesController } from "../controller";
import { validarCampos, validarJWT } from "../middlewares";
import { validarAdminJWT } from "../middlewares/validar-jwt.middleware";
const router = Router();

router.post(
  "/",
  [
    validarJWT,
    validarAdminJWT,
    check("idQuestion", "El id de la pregunta es obligatorio").isMongoId(),
    check("description", "La descripción es obligatoria").isString(),
    check(
      "description",
      "La descripción debe tener 10 cáracteres como mínimo y 1000 como máximo"
    ).isLength({
      min: 10,
      max: 1000,
    }),
    validarCampos,
  ],
  responsesController.createResponse
);

router.put(
  "/:idRespuesta",
  [
    validarJWT,
    validarAdminJWT,
    check("idRespuesta", "El id de la respuesta debe ser válido").isMongoId(),
    check("id", "El id de la respuesta es obligatorio").isMongoId(),
    check("description", "La descripción es obligatoria").isString(),
    check(
      "description",
      "La descripción debe tener 10 cáracteres como mínimo y 1000 como máximo"
    ).isLength({
      min: 10,
      max: 1000,
    }),
    validarCampos,
  ],
  responsesController.editResponse
);

router.delete(
  "/:id",
  [
    validarJWT,
    validarAdminJWT,
    check("id", "El id de la respuesta es obligatorio").isMongoId(),
    validarCampos,
  ],
  responsesController.deleteResponse
);

module.exports = router;
