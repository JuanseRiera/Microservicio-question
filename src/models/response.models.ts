import { Document, Schema, model } from "mongoose";

export interface IResponse extends Document {
  question: String;
  idUser: String;
  description: String;
  edited: Date;
  editedBy: String;
  deleteddBy: String;
  initDate: Date;
  endDate: Date;
}

const ResponseSchema = new Schema({
  question: { type: "ObjectId", ref: "Question" },
  idUser: {
    type: String,
    required: [true, "El id del usuario es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del usuario es obligatoria"],
  },
  edited: {
    type: Date,
  },
  editedBy: {
    type: String,
  },
  deletedBy: {
    type: String,
  },
  initDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
  },
});

export let Response = model<IResponse>("Response", ResponseSchema);
