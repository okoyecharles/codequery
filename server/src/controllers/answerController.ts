import { Request, Response } from "express";
import Question from "../models/Question";
import Answer from "../models/Answer";
import { AuthorizedRequest } from "../types/request";
import User from "../models/User";

/*
  * @route GET /questions/:id/answers
  * @desc Get all answers for a question
  * @access Public
*/
export const getAnswers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    
    const answers = await Answer.find({ question: id });

    res.status(200).json({ answers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};

/*
  * @route POST /questions/:id/answers
  * @desc Answer a question
  * @access Public
*/
export const answerQuestion = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const question = await Question.findById(id);
    const answerer = await User.findById(req.user);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    const newAnswer = new Answer({
      answer,
      user: answerer?._id,
      question: id,
    });
    await newAnswer.save();
    question.answers.push(newAnswer._id);
    await question.save();
    const updatedQuestion = await question.populate(["answers", "user"]);

    res.status(201).json({ question: updatedQuestion, message: "Answer added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};

/*
  * @route DELETE /questions/:id/answers/:answerId
  * @desc Delete an answer
  * @access Public
*/
export const deleteAnswer = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const { id, answerId } = req.params;

    const question = await Question.findById(id);
    const answer = await Answer.findById(answerId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    if (!answer) {
      res.status(404).json({ message: "Answer not found" });
      return;
    }

    question.answers = question.answers.filter(
      (ans) => ans.toString() !== answerId
    );
    await question.save();
    await Answer.deleteOne({ _id: answerId });
    const updatedQuestion = await question.populate(["answers", "user"]);

    res.status(200).json({ question: updatedQuestion, message: "Answer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};

/*
  * @route PUT /questions/:id/answers/:answerId
  * @desc Update an answer
  * @access Public
*/
export const updateAnswer = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const { id, answerId } = req.params;
    const { answer } = req.body;

    const question = await Question.findById(id);
    const answerExists = await Answer.findById(answerId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    if (!answerExists) {
      res.status(404).json({ message: "Answer not found" });
      return;
    }

    if (answerExists) answerExists.answer = answer;
    await answerExists.save();
    const updatedQuestion = question.populate(["answers", "user"]);
    res.status(200).json({ question: updatedQuestion, message: "Answer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};