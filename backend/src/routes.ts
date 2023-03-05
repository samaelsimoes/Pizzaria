import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController  } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// -- ROTAS USER POST salvar!!--
router.post('/users', new CreateUserController().handle)

// - Rota de  Login
router.post('/session', new AuthUserController().handle)

// Busca dos detalhes do usuario + token obrigatorio
router.get('/userInfo', isAuthenticated, new DetailUserController().handle)

export { router };
