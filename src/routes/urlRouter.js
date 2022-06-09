import {Router} from 'express';

import { shortUrl, getUrl, redirectUrl, deleteUrl } from './../controllers/urlController.js';
import {shortUrlRules, deleteUrlsRules} from './../middlewares/urlRules.js';
const urlRouter = Router();

urlRouter.post('/urls/shorten', shortUrlRules, shortUrl);
urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', redirectUrl);
urlRouter.delete('/urls/:id', deleteUrlsRules, deleteUrl);

export default urlRouter;