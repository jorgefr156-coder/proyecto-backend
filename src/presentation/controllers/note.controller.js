export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  createNote = async (req, res) => {
    const data = req.body;
    
    // Si viene un archivo en la petición, guardamos la ruta en imageurl
    if (req.file) data.imageurl = '/uploads/' + req.file.filename;
    
    data.userId = 'user_123'; // TODO: LUEGO OBTENER EL USUARIO DE LA SESION
    
    try {
      const note = await this.noteService.createNote(data);
      res.status(201).json(note); // 201 Created
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  getNotesByUserId = async (req, res) => {
    const userId = 'user_123';
    try {
      const notes = await this.noteService.getNotesByUserId(userId);
      res.status(200).json(notes); // 200 OK
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // --- MÉTODOS PARA LA TAREA (DENTRO DE LA CLASE) ---

  updateNote = async (req, res) => {
    const { id } = req.params; // Capturamos el ID de la URL
    const data = req.body;     // Capturamos los nuevos datos del cuerpo
    try {
      const updatedNote = await this.noteService.updateNote(id, data);
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
      await this.noteService.deleteNote(id);
      res.status(204).send(); // 204 No Content para eliminaciones exitosas
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}