import { jest } from '@jest/globals'; // <-- Solución clave del ingeniero para ES Modules[cite: 3]
import AuthService from '../../src/application/use-cases/auth.service.js';
import UserMongoRepository from '../../src/infrastructure/database/mongo/user.mongo.repository.js';

describe('AuthService - Pruebas Unitarias', () => {
    let authService;

    // Se ejecuta antes de cada prueba (Clean State)[cite: 3]
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiamos los mocks[cite: 3]
        authService = new AuthService();
    });

    it('Debería lanzar un error si el email ya existe al intentar registrar', async () => {
        // 1. ARRANGE (Preparar el escenario)[cite: 3]
        // En lugar de jest.mock(), usamos spyOn sobre el prototipo de la clase (compatible con ESM)
        jest.spyOn(UserMongoRepository.prototype, 'findByEmail').mockResolvedValue({ 
            id: '1', 
            email: 'test@example.com' 
        });
        
        const userData = { 
            email: 'test@example.com', 
            password: 'password123' 
        };

        // 2 y 3. ACT & ASSERT (Actuar y Verificar)[cite: 3]
        // Esperamos que la promesa sea rechazada con el mensaje de error[cite: 3]
        await expect(authService.register(userData))
            .rejects
            .toThrow('El email ya está en uso');
    });
});