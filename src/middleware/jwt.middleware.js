import jwt from "jsonwebtoken"
import UserRepository from "../features/user/user.repository.js";

const jwtAuth = async (req, res, next) => {

    const token = req.cookies.token; 
    
    if (!token) {
        return res.status(401).send('Unauthorized access');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        const userRepository = new UserRepository();
        const user = await userRepository.findUserById(decoded.id);

        if(!user){
            return res.status(401).send('Unauthorized access');
        }

        req.user = user;

        next(); 
    } catch (error) {
        return res.status(403).send('Unauthorized access');
    }
};

export default jwtAuth;
