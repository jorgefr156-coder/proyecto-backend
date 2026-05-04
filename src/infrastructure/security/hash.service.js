import bcrypt from 'bcryptjs';

export default class HashService {
    static async hash(text) {
        // Encripta con una complejidad de 10
        return await bcrypt.hash(text, 10);
    }

    static async compare(text, hash) {
        // Compara el texto plano con el hash de la base de datos
        return await bcrypt.compare(text, hash);
    }
}