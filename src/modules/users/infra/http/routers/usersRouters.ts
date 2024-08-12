import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import UserFactory from '@/modules/users/utils/factory';

const usersRouters = Router();
const userController = UserFactory.createUserController();

usersRouters.post('/', asyncHandler(async (req, res) => {
  await userController.create(req, res);
}));

export default usersRouters;
