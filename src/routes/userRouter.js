import { Router } from "express";

import {addNewUser, userLogin} from '../controllers/usersController.js';
import {addNewUserRules, userLoginRules} from '../middlewares/usersRules.js';

const usersRouter = Router();

usersRouter.post('/signup', addNewUserRules, addNewUser);
usersRouter.post('/signin', userLoginRules, userLogin);

export default usersRouter;