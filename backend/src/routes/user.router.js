import { Router } from 'express';

import { 
    registerUser, loginUser, logoutUser, getUserProfile, 
    updateUserProfile, userLoginStatus
} from '../controllers/auth/user.controller.js';
import { isAuthenticatedMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/login-status', userLoginStatus);

userRouter.get('/profile', isAuthenticatedMiddleware, getUserProfile);
userRouter.patch('/profile/update', isAuthenticatedMiddleware, updateUserProfile);

export default userRouter;