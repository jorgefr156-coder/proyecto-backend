import NoteModel from "./note.model.js";

export default class NoteMongoRepository {
  constructor() {
    this.model = NoteModel;
  }

  // Renombrado a 'create' para coincidir con el NoteService
  async create(noteEntity) {
    const note = new this.model({
      title: noteEntity.title,
      content: noteEntity.content,
      imageUrl: noteEntity.imageUrl,
      isPrivate: noteEntity.isPrivate,
      password: noteEntity.password,
      userId: noteEntity.userId,
      categoryId: noteEntity.categoryId // <-- Del Ejercicio 2
    });

    const savedNote = await note.save();
    return savedNote.toObject();
  }

  // Renombrado para coincidir con el NoteService
  async getNotesByUserId(userId) {
    return await this.model.find({ userId });
  }

  // ==========================================
  // NUEVO: Requerido para el Ejercicio 3
  // ==========================================
  async findById(id) {
    return await this.model.findById(id);
  }

  // --- MÉTODOS DE LA TAREA ---
  async update(id, data) {
    // { new: true } devuelve el documento ya actualizado
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}