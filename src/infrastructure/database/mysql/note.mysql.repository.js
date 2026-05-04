import NoteModel from "./note.model.js";

export default class NoteMySQLRepository {
  constructor() {
    this.model = NoteModel;
  }

  async save(noteEntity) {
    const note = await this.model.create({
      title: noteEntity.title,
      content: noteEntity.content,
      imageUrl: noteEntity.imageUrl,
      isPrivate: noteEntity.isPrivate,
      password: noteEntity.password,
      userId: noteEntity.userId
    });
    return note.toJSON();
  }

  async findByUserId(userId) {
    const notes = await this.model.findAll({ where: { userId } });
    return notes.map(note => note.toJSON());
  }

  // --- MÉTODOS DE LA TAREA ---
  async update(id, data) {
    await this.model.update(data, { where: { id } });
    return await this.model.findByPk(id); // Retornamos el objeto actualizado[cite: 2]
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }
}