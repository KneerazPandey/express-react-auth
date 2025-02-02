import expressAsyncHandler from "express-async-handler";

import User from "../../models/auth/user.model.js";


export const deleteUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: 'Unable to find user to delete.'});
        }
        return res.status(204).json({message: 'User deleted successfully'});
    }catch(error) {
        return res.status(404).json({message: 'Unable to find user to delete.'});
    }
});


export const getAllUser = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    }catch(error) {
        return res.status(500).json({message: 'Error occured. please try again.'});
    }
});