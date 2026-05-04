import AuthService from '../../application/use-cases/auth.service.js';

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    // Método para registrar un usuario
    register = async (req, res) => {
        try {
            const user = await this.authService.register(req.body);
            // 201 Created: Solicitud exitosa y recurso creado
            res.status(201).json({ message: 'Usuario registrado con éxito', user });
        } catch (error) {
            // 400 Bad Request: Error del cliente (ej. email ya existe)
            res.status(400).json({ error: error.message });
        }
    }

    // Método para iniciar sesión
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Validamos que envíe los datos necesarios
            if (!email || !password) {
                return res.status(400).json({ error: 'Email y password son requeridos' });
            }

            const data = await this.authService.login(email, password);
            // 200 OK: Solicitud exitosa
            res.status(200).json(data);
        } catch (error) {
            // 401 Unauthorized: Credenciales incorrectas
            res.status(401).json({ error: error.message });
        }
    }
}