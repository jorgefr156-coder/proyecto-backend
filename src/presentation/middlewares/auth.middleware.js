import JwtService from '../../infrastructure/security/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    // Extraemos el header de Autorización
    const authHeader = req.headers.authorization;

    // Verificamos que exista y que empiece con "Bearer "[cite: 3]
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proveído o formato inválido' });
    }

    // Extraemos solo el token (quitamos la palabra "Bearer ")[cite: 3]
    const token = authHeader.split(' ')[1];
    
    // Verificamos el token con nuestro servicio[cite: 3]
    const payload = JwtService.verifyToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // Si es válido, inyectamos la info del usuario en la request para que el siguiente paso la use[cite: 3]
    req.user = payload;
    next();
};