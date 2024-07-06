import { Router } from 'express';

const userRouter = Router();


userRouter.get('/', (req, res) => {
    res.send("Hello From User Router");
});

export default userRouter;