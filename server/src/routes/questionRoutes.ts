import { protect } from './../middleware/authMiddleware';
import express from 'express';
import { askQuestion, deleteQuestion, getQuestion, getQuestions, searchQuestions, updateQuestion } from '../controllers/questionController';
import { answerQuestion, deleteAnswer, getAnswers, updateAnswer } from '../controllers/answerController';

const router = express.Router();

// Question routes
router.get('/', getQuestions);
router.get('/search', searchQuestions);
router.post('/', protect, askQuestion);
router.get('/:id', getQuestion);
router.delete('/:id', protect, deleteQuestion);
router.put('/:id', protect, updateQuestion);

// Answer routes
router.get('/:id/answers', getAnswers);
router.post('/:id/answers', protect, answerQuestion);
router.delete('/:id/answers/:answerId', protect, deleteAnswer);
router.put('/:id/answers/:answerId', protect, updateAnswer);

export default router;