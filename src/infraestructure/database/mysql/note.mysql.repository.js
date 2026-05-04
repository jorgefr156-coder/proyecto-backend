import NoteModel from "./note.model.js"; // Importamos el modelo separado

export default class NoteMySQLRepository {
    async save(noteEntity) {
        const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userid
        });
        return note.toJSON();
    }

    async findByUserId(userId) {
        const notes = await NoteModel.findAll({ where: { userId } });
        return notes.map(note => note.toJSON());
    }
}