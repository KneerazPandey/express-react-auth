import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/auth/user.model.js";


export const isAuthenticatedMiddleware = expressAsyncHandler(async (req, res, next) => {
    try{
        // Check if the user is login
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({message: 'Not authorized, please login!'});
        }
        const bearerToken = authorizationHeader.split(' ');
        if (bearerToken.length != 2 || bearerToken[0] != 'Bearer') {
            return res.status(401).json({message: 'Not authorized, please login!'});
        }

        // verifying the token
        const token = bearerToken[1];
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        // Getting the user detail from the verified token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        // Setting the user details in request object
        req.user = user;
        
        next();
    }catch(error) {
        return res.status(401).json({message: 'Not authorized, please login!'});
    }
});



export const isAdminMiddleware = expressAsyncHandler(async (req, res, next) => {
    try{
        if (req.user && req.user.role == 'admin') {
            return next();
        }
        return res.status(403).json({message: `You don't have admin permission`});
    }catch(error) {
        return res.status(403).json({message: `You don't have admin permission`});
    }
});