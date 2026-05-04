import UserModel from './user.model.js';
import UserEntity from '../../../domain/entities/user.entity.js';

export default class UserMongoRepository {
    
    async save(userEntity) {
        const newUser = new UserModel({
            email: userEntity.email,
            password: userEntity.password,
            role: userEntity.role
        });
        
        const savedUser = await newUser.save();
        
        return new UserEntity({
            id: savedUser._id,
            email: savedUser.email,
            password: savedUser.password,
            role: savedUser.role
        });
    }

    async findByEmail(email) {
        const user = await UserModel.findOne({ email });
        if (!user) return null;
        
        return new UserEntity({
            id: user._id,
            email: user.email,
            password: user.password,
            role: user.role
        });
    }
}