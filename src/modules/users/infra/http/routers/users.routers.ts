import { Router } from 'express';
import UserFactory from '@/modules/users/utils/factory';

const router = Router();
const userController = UserFactory.createUserController();

router.get('/', (req, res) => userController.create(req, res));
