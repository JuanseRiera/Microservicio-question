import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
  idArticle: string;
  idUser: string;
  response: string;
  description: string;
  edited: Date;
  initDate: Date;
  endDate: Date;
}

const QuestionSchema = new Schema({
  idArticle: {
    type: String,
    required: [true, "El id del articulo es obligatorio"],
  },
  idUser: {
    type: String,
    required: [true, "El id del usuario es obligatorio"],
  },
  response: { type: "ObjectId", ref: "Response" },
  description: {
    type: String,
    required: [true, "La descripción del usuario es obligatoria"],
  },
  edit: {
    type: Date,
  },
  initDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
  },
});

export let Question = model<IQuestion>("Question", QuestionSchema);
