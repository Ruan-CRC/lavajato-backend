import { Router } from 'express';
import UserFactory from '@/modules/users/utils/factory';

const router = Router();
const userController = UserFactory.createUserController();

router.post('/', (req, res) => userController.create(req, res));

export default router;
