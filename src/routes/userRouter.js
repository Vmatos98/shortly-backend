import { Router } from "express";

import {addNewUser, userLogin, getUser, getUsersRanking} from '../controllers/usersController.js';
import {addNewUserRules, userLoginRules, getUserRules} from '../middlewares/usersRules.js';

const usersRouter = Router();

usersRouter.post('/signup', addNewUserRules, addNewUser);
usersRouter.post('/signin', userLoginRules, userLogin);
usersRouter.get('/users/:id', getUserRules, getUser);
usersRouter.get('/ranking', getUsersRanking);

export default usersRouter;