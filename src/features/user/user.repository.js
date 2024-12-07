import { UserModel } from "./user.schema.js";

export default class UserRepository {
    async createUser(user) {
        try {
            const newUser = new UserModel(user);
            return await newUser.save();
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw new Error('Error getting user by email');
        }
    }

    async findUserById(id){
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw new Error('Error finding user by id');
        }
    }
}