import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import UserFactory from '@/modules/users/utils/factory';

const router = Router();
const userController = UserFactory.createUserController();

router.post('/', asyncHandler(async (req, res) => {
  await userController.create(req, res);
}));

export default router;
