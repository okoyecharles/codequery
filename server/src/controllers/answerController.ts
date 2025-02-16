import dotenv from "dotenv";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Question, { QuestionType } from "../models/Question";
import Answer from "../models/Answer";
import { AuthorizedRequest } from "../types/request";
import User from "../models/User";
import { getDetailedQuestion } from "./questionController";

dotenv.config();

function generatePrompt(question: QuestionType) {
  const preAnswerPrompt = `
    You are meant to help people find answers to programming related questions.
    
    If the question below is not programming related and/or isn't really a question at all, please let the user know that you could not find an answer to the question nicely with 200 character reason. Normal answers have a maximum of 750 characters.

    ${question.intelligentAnswer ? `The question has already been answered. Please provide a new answer, (Previous Answer: ${question.intelligentAnswer}).` : ""}

    It is important to remember that the user interface is rendered in html, please return your answer as HTML. No need to include the <html> or <body> tags or  \`\`\`html\`\`\` code blocks. Just the HTML content. JUST HTML NO MARKDOWN OR ASTERISKS.
    
    Please provide an answer to the following question (The question is wrapped in three quotes """):

    """
    ${question.question}
    """
  `;

  return preAnswerPrompt;
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const genAIModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

    const answers = await Answer.find({ question: id }).populate("user");

    res.status(200).json({ answers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};

/*
  * @route PUT /questions/:id/intelligent
  * @desc Get an answer from Artifitial Intelligence
  * @access Public
*/
export const getAIAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    const prompt = generatePrompt(question);
    const result = await genAIModel.generateContent(prompt);
    question.intelligentAnswer = result.response.text();
    await question.save();
    const updatedQuestion = await getDetailedQuestion(id);

    res.status(200).json({ question: updatedQuestion, message: "Intelligent answer added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error || "Something went wrong... Please try again" });
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
    const updatedQuestion = await getDetailedQuestion(id);

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
    const updatedQuestion = await getDetailedQuestion(id);

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
    const updatedQuestion = getDetailedQuestion(id);
    res.status(200).json({ question: updatedQuestion, message: "Answer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};