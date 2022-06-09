import {Router} from 'express';

import { shortUrl, getUrl, redirectUrl } from './../controllers/urlController.js';
import {shortUrlRules} from './../middlewares/urlRules.js';
const urlRouter = Router();

urlRouter.post('/urls/shorten', shortUrlRules, shortUrl);
urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', redirectUrl);

export default urlRouter;