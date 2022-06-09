import {Router} from 'express';

import { shortUrl, getUrl } from './../controllers/urlController.js';
import {shortUrlRules} from './../middlewares/urlRules.js';
const urlRouter = Router();

urlRouter.post('/urls/shorten', shortUrlRules, shortUrl);
urlRouter.get('/urls/:id', getUrl);

export default urlRouter;