import { Router } from 'express';

import { 
    registerUser, loginUser, logoutUser, getUserProfile
} from '../controllers/auth/user.controller.js';
import { isAuthenticatedMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

userRouter.get('/profile', isAuthenticatedMiddleware, getUserProfile);

export default userRouter;