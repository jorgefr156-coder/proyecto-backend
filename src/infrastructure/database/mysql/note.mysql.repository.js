import NoteModel from "./note.model.js";

export default class NoteMySQLRepository {
  constructor() {
    this.model = NoteModel;
  }

  // Renombrado a 'create' para coincidir con el NoteService
  async create(noteEntity) {
    const note = await this.model.create({
      title: noteEntity.title,
      content: noteEntity.content,
      imageUrl: noteEntity.imageUrl,
      isPrivate: noteEntity.isPrivate,
      password: noteEntity.password,
      userId: noteEntity.userId,
      categoryId: noteEntity.categoryId // <-- Del Ejercicio 2
    });
    return note.toJSON();
  }

  // Renombrado para coincidir con el NoteService
  async getNotesByUserId(userId) {
    const notes = await this.model.findAll({ where: { userId } });
    return notes.map(note => note.toJSON());
  }

  // ==========================================
  // NUEVO: Requerido para el Ejercicio 3
  // ==========================================
  async findById(id) {
    return await this.model.findByPk(id);
  }

  // --- MÉTODOS DE LA TAREA ---
  async update(id, data) {
    await this.model.update(data, { where: { id } });
    return await this.model.findByPk(id); // Retornamos el objeto actualizado
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }
}