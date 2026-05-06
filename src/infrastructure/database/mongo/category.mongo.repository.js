import CategoryModel from './category.model.js';
import CategoryEntity from '../../../domain/entities/category.entity.js';

export default class CategoryMongoRepository {
    async save(categoryEntity) {
        const newCategory = new CategoryModel({
            name: categoryEntity.name,
            description: categoryEntity.description
        });
        
        const savedCategory = await newCategory.save();
        
        return new CategoryEntity({
            id: savedCategory._id,
            name: savedCategory.name,
            description: savedCategory.description
        });
    }
}