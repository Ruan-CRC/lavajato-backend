import { Router } from 'express';
// import asyncHandler from 'express-async-handler';

const funcionarioRouters = Router();

funcionarioRouters.get('/funcionarios', async (req, res) => {
  res.json({ message: 'Hello World' });
});

export default funcionarioRouters;
