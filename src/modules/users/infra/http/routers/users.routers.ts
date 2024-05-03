import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userControler = new UserController();

router.get('/', (req, res) => userControler.create(req, res));
