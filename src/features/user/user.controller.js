import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            
            const { email, password, name } = req.body;

            const userExists = await this.userRepository.getUserByEmail(email);

            if(userExists){
                return res.status(400).send("User already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await this.userRepository.createUser({ name, email: email.toLowerCase(), password: hashedPassword });

            if(!user){
                throw Error("SignUp Failed!");
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

            res.cookie('token',token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000});

            res.status(201).send({
                name: user.name,
                email: user.email,
            });

        } catch (error) {
            next(error);
        }
    }

    async signIn(req, res, next) {
        try {

            const { email, password } = req.body;

            const userExists = await this.userRepository.getUserByEmail(email);

            if(!userExists){
                return res.status(404).send("User not found");
            }

            const validate = await bcrypt.compare(password, userExists.password);

            if(!validate){
                return res.status(401).send("Invalid password");
            }

            const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

            res.cookie('token',token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000});
            
            res.status(200).send({
                name: userExists.name,
                email: userExists.email
            });
        } catch (error) {
            next(error);
        }
    }
}