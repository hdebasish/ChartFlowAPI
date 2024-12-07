import express from "express"
import UserController from "./user.controller.js";
import Validator from "../../middleware/validator.middleware.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signin", Validator.userSignInRules(), Validator.validate, (req, res, next) => {
    userController.signIn(req, res, next);
});

userRouter.post("/signup", Validator.userSignUpRules(), Validator.validate, (req, res, next) => {
    userController.signUp(req, res, next);
});

export default userRouter;