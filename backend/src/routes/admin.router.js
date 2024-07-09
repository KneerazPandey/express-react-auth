import { Router } from 'express';

import { deleteUser, getAllUser } from '../controllers/auth/admin.controller.js';
import { 
    isAuthenticatedMiddleware, isAdminMiddleware
 } from '../middlewares/auth.middleware.js';

const adminRouter = Router();

adminRouter.delete('/admin/profile/:id', isAuthenticatedMiddleware, isAdminMiddleware, deleteUser);
adminRouter.get('/users', isAuthenticatedMiddleware, isAdminMiddleware, getAllUser);

export default adminRouter;