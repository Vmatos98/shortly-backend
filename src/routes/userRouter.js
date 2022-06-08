import { Router } from "express";

import {addNewUser} from '../controllers/usersController.js';
import {addNewUserRules} from '../middlewares/usersRules.js';

const usersRouter = Router();

usersRouter.post('/signup',addNewUserRules, addNewUser);

export default usersRouter;