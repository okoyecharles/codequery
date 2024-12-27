import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserType } from '../models/User';
import { CookieOptions, Request, Response } from 'express';
import { AuthorizedRequest, TokenUser } from '../types/request';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET!;
const tokenExpiration = process.env.NODE_ENV === 'development' ? '1d' : '7d';
const tokenName = process.env.SESSION_TOKEN_NAME!;
const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

/* 
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
*/
export const getUsers = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong... Please try again' });
  }
};

/*
 * @route   DELETE /users/:id
 * @desc    Delete a user
 * @access  Public
*/
export const deleteUser = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const { id } = req.params;

    const userExists = await User.findById(id);

    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await User.deleteOne({ _id: id });
    const users = await User.find();

    res.status(200).json({ users, message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong... Please try again' });
  }
};

/*
 * @route   POST /users/signup
 * @desc    Register a new user
 * @access  Public
 */
export const register = async (
  req: Request<never, never, UserType>,
  res: Response
) => {
  const { name, username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: 'User with username already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    console.log(newUser._id.toString());
    const token = generateToken(newUser._id.toString());
    console.log(token);

    res.status(200)
      .cookie(tokenName, token, cookieOptions)
      .json({ user: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong... Please try again' });
  }
};

/*
 * @route   POST /users/signin
 * @desc    Login a user
 * @access  Public
 */
export const login = async (
  req: Request<never, never, UserType>,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    };

    const token = generateToken(user._id.toString());
    res
      .status(200)
      .cookie(tokenName, token, cookieOptions)
      .json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong... Please try again' });
  }
};

/*
 * @route   POST /users/signout
  * @desc    Logout a user
  * @access  Public
  */
export const logout = async (req: Request, res: Response) => {
  res.clearCookie(
    tokenName,
    cookieOptions
  ).send({ message: 'Logged out successfully' });
};

/*
  * @route   POST /users/validate
  * @desc    Validate a user
  * @access  Public
*/
export const validateUser = async (req: Request, res: Response) => {
  const token = req.cookies[tokenName];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenUser;

  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401).json({ message: 'User does not exist' });
    return;
  }

  res.status(200).json({
    user, token
  });
};

/*
 * @route   PUT /users/:id
 * @desc    Update a user
 * @access  Public
  */
export const updateUser = async (
  req: AuthorizedRequest<UserType>,
  res: Response
) => {
  const { id } = req.params;
  const { name, username } = req.body;

  try {
    const userExists = await User.findById(id);
    const userNameExists = await User.findOne({ username });

    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (userNameExists && userNameExists.username !== userExists.username) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    if (req.user !== userExists._id.toString()) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (name) userExists.name = name;
    if (username) userExists.username = username;

    const updatedUser = await userExists.save();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong... Please try again' });
  }
};

/*
 * @desc    Genrate a token based on user id
 */
const generateToken = (id: string) => {
  const user: TokenUser = { id };
  console.log('token generated for ', user);
  console.log({ user, secret, tokenExpiration });
  const token = jwt.sign(user, secret, {
    expiresIn: tokenExpiration,
  });
  return token;
};
