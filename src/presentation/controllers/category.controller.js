export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(201).json({ message: 'Categoría creada con éxito', category });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}