import { Router, Request, Response } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';

import uploadConfig from './config/multer';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailuserController } from './controllers/user/DetailUserController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));
// sempre passar o Authenticated!

// -- Rotas de user --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

// Busca os detalhes do usuario + token obrigatorio
router.get('/userInfo', isAuthenticated, new DetailuserController().handle);

// -- Rotas de categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/itensCategory', isAuthenticated, new ListCategoryController().handle);

// -- Rotas de produtos
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/listProduct', isAuthenticated, new ListByCategoryController().handle);

// -- Rotas Orders
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/removeItem', isAuthenticated, new RemoveItemController().handle);

// -- Rotas de SendOrder
router.put('/order/send', isAuthenticated, new SendOrderController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };
