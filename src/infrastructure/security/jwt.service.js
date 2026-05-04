import jwt from 'jsonwebtoken';

export default class JwtService {
    static generateToken(payload) {
        // Genera el token con una expiración de 4 horas
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
    }

    static verifyToken(token) {
        try {
            // Verifica si el token es válido y retorna el payload
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null; // Si expiró o fue manipulado, retorna null
        }
    }
}