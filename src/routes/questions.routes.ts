import { Router } from "express";
import { check } from "express-validator";
import { questionsController } from "../controller";
import { validarCampos, validarJWT } from "../middlewares";
const router = Router();

router.get(
  "/:idArticle",
  [
    check("idArticle", "El id del artículo es obligatorio").isMongoId(),
    validarCampos,
  ],
  questionsController.findArticleQuestions
);

router.post(
  "/",
  [
    validarJWT,
    check("idArticle", "El id del artículo es obligatorio").isMongoId(),
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
  questionsController.createQuestion
);

router.put(
  "/",
  [
    validarJWT,
    check("id", "El id de la pregunta es obligatorio").isMongoId(),
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
  questionsController.editQuestion
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id de la pregunta es obligatorio").isMongoId(),
    validarCampos,
  ],
  questionsController.deleteQuestion
);

module.exports = router;
