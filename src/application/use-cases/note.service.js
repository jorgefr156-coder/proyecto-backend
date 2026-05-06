export default class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async createNote(data) {
    return await this.noteRepository.create(data);
  }

  async getNotesByUserId(userId) {
    return await this.noteRepository.getNotesByUserId(userId);
  }

  // ==========================================
  // NUEVO: Requerido para el Ejercicio 3 (Ruta Pública)
  // ==========================================
  async getNoteById(id) {
    return await this.noteRepository.findById(id);
  }

  async updateNote(id, data) {
    // Llama al método update del repositorio (Mongo o MySQL)
    return await this.noteRepository.update(id, data);
  }

  async deleteNote(id) {
    // Llama al método delete del repositorio
    return await this.noteRepository.delete(id);
  }
}