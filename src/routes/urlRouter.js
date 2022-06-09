import {Router} from 'express';

import { shortUrl } from './../controllers/urlController.js';
import {shortUrlRules} from './../middlewares/urlRules.js';
const urlRouter = Router();

urlRouter.post('/urls/shorten', shortUrlRules, shortUrl);


export default urlRouter;