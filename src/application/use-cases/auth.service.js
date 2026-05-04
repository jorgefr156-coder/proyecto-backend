import UserMongoRepository from '../../infrastructure/database/mongo/user.mongo.repository.js';
import HashService from '../../infrastructure/security/hash.service.js';
import JwtService from '../../infrastructure/security/jwt.service.js';
import UserEntity from '../../domain/entities/user.entity.js';

export default class AuthService {
    constructor() {
        // Instanciamos el repositorio que creaste en el paso anterior
        this.userRepository = new UserMongoRepository();
    }

    async register(data) {
        // 1. Validar que el correo no exista previamente[cite: 3]
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('El email ya está en uso');
        }

        // 2. Encriptar la contraseña antes de guardarla[cite: 3]
        const hashedPassword = await HashService.hash(data.password);

        // 3. Crear la nueva entidad de usuario con el password encriptado[cite: 3]
        const newUser = new UserEntity({
            ...data,
            password: hashedPassword
        });

        // 4. Guardar en la base de datos[cite: 3]
        const savedUser = await this.userRepository.save(newUser);
        
        // Retornamos el usuario guardado (sin la contraseña idealmente, pero la entidad ya la maneja)
        return savedUser;
    }

    async login(email, password) {
        // 1. Buscar al usuario por correo[cite: 3]
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // 2. Comparar la contraseña recibida con la encriptada en la BD[cite: 3]
        const isPasswordValid = await HashService.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        // 3. Generar el payload con la información útil del usuario[cite: 3]
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        // 4. Generar el JSON Web Token[cite: 3]
        const token = JwtService.generateToken(payload);

        // 5. Retornar el token y los datos del usuario[cite: 3]
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
    }
}