import { IQuestion, Question } from "../models/question.models";

export interface QuestionRequest {
  description: string;
  idArticle: string;
  idUser: string;
}

export async function createQuestionService(body: QuestionRequest) {
  return new Promise<IQuestion>((resolve, reject) => {
    try {
      const question = <IQuestion>new Question();
      question.description = body.description;
      question.idArticle = body.idArticle;
      question.initDate = new Date();
      question.idUser = body.idUser;

      // Then save the question
      question.save(function (err: any) {
        if (err) reject(err);
        resolve(question);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function editQuestionService(id: string, data: any) {
  return Question.findByIdAndUpdate(id, data, { new: true });
}

export function deleteQuestionService(id: string) {
  return Question.findByIdAndUpdate(id, { endDate: new Date() }, { new: true });
}
export function deleteQuestionPermanentlyService(id: string) {
  return Question.findByIdAndDelete(id);
}

export function findQuestionService(id: string) {
  return Question.findById(id).populate("response");
}

export function findQuestionsOfArticleService(idArticle: string) {
  return Question.find({ idArticle, endDate: undefined }).populate("response");
}
