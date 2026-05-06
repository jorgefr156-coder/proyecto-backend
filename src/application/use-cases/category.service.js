import CategoryEntity from '../../domain/entities/category.entity.js';

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data) {
        if (!data.name) {
            throw new Error('El nombre de la categoría es requerido');
        }
        const newCategory = new CategoryEntity(data);
        return await this.categoryRepository.save(newCategory);
    }
}