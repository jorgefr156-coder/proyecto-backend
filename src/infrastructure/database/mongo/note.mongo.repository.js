import NoteModel from "./note.model.js";

export default class NoteMongoRepository {
  constructor() {
    this.model = NoteModel;
  }

  async save(noteEntity) {
    const note = new this.model({
      title: noteEntity.title,
      content: noteEntity.content,
      imageUrl: noteEntity.imageUrl,
      isPrivate: noteEntity.isPrivate,
      password: noteEntity.password,
      userId: noteEntity.userId
    });

    const savedNote = await note.save();
    return savedNote.toObject();
  }

  async findByUserId(userId) {
    return await this.model.find({ userId });
  }

  // --- MÉTODOS DE LA TAREA ---
  async update(id, data) {
    // { new: true } devuelve el documento ya actualizado en lugar del antiguo[cite: 2]
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}