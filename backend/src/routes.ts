import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

const router = Router();

// -- Rotas de user --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

// Busca os detalhes do usuario + token obrigatorio
router.get('/userInfo', isAuthenticated, new DetailUserController().handle);

// -- Rotas de categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/itensCategory', isAuthenticated, new ListCategoryController().handle);

export { router };
