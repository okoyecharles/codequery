"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnswer = exports.deleteAnswer = exports.answerQuestion = exports.getAnswers = void 0;
const Question_1 = __importDefault(require("../models/Question"));
const Answer_1 = __importDefault(require("../models/Answer"));
const User_1 = __importDefault(require("../models/User"));
const questionController_1 = require("./questionController");
/*
  * @route GET /questions/:id/answers
  * @desc Get all answers for a question
  * @access Public
*/
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield Question_1.default.findById(id);
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        const answers = yield Answer_1.default.find({ question: id }).populate("user");
        res.status(200).json({ answers });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong... Please try again" });
    }
});
exports.getAnswers = getAnswers;
/*
  * @route POST /questions/:id/answers
  * @desc Answer a question
  * @access Public
*/
const answerQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const question = yield Question_1.default.findById(id);
        const answerer = yield User_1.default.findById(req.user);
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        const newAnswer = new Answer_1.default({
            answer,
            user: answerer === null || answerer === void 0 ? void 0 : answerer._id,
            question: id,
        });
        yield newAnswer.save();
        question.answers.push(newAnswer._id);
        yield question.save();
        const updatedQuestion = yield (0, questionController_1.getDetailedQuestion)(id);
        res.status(201).json({ question: updatedQuestion, message: "Answer added successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong... Please try again" });
    }
});
exports.answerQuestion = answerQuestion;
/*
  * @route DELETE /questions/:id/answers/:answerId
  * @desc Delete an answer
  * @access Public
*/
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, answerId } = req.params;
        const question = yield Question_1.default.findById(id);
        const answer = yield Answer_1.default.findById(answerId);
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        if (!answer) {
            res.status(404).json({ message: "Answer not found" });
            return;
        }
        question.answers = question.answers.filter((ans) => ans.toString() !== answerId);
        yield question.save();
        yield Answer_1.default.deleteOne({ _id: answerId });
        const updatedQuestion = yield (0, questionController_1.getDetailedQuestion)(id);
        res.status(200).json({ question: updatedQuestion, message: "Answer deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong... Please try again" });
    }
});
exports.deleteAnswer = deleteAnswer;
/*
  * @route PUT /questions/:id/answers/:answerId
  * @desc Update an answer
  * @access Public
*/
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, answerId } = req.params;
        const { answer } = req.body;
        const question = yield Question_1.default.findById(id);
        const answerExists = yield Answer_1.default.findById(answerId);
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        if (!answerExists) {
            res.status(404).json({ message: "Answer not found" });
            return;
        }
        if (answerExists)
            answerExists.answer = answer;
        yield answerExists.save();
        const updatedQuestion = (0, questionController_1.getDetailedQuestion)(id);
        res.status(200).json({ question: updatedQuestion, message: "Answer updated successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong... Please try again" });
    }
});
exports.updateAnswer = updateAnswer;
