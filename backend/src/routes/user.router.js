import { Router } from 'express';

import { 
    registerUser, loginUser, logoutUser, getUserProfile,
    updateUserProfile
} from '../controllers/auth/user.controller.js';
import { deleteUser } from '../controllers/auth/admin.controller.js';
import { 
    isAuthenticatedMiddleware, isAdminMiddleware
 } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

userRouter.get('/profile', isAuthenticatedMiddleware, getUserProfile);
userRouter.patch('/profile/update', isAuthenticatedMiddleware, updateUserProfile);

userRouter.delete('/admin/profile/:id', isAuthenticatedMiddleware, isAdminMiddleware, deleteUser);

export default userRouter;