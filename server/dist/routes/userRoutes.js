"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, userController_1.getUsers);
router.post('/validate', authMiddleware_1.protect, userController_1.validateUser);
router.put('/:id', authMiddleware_1.protect, userController_1.updateUser);
router.delete('/:id', authMiddleware_1.protect, userController_1.deleteUser);
router.post('/signup', userController_1.register);
router.post('/signin', userController_1.login);
router.post('/signout', userController_1.logout);
exports.default = router;
