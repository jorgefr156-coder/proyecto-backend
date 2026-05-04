import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Notas',
            version: '1.0.0',
            description: 'Documentación interactiva de la API de Notas'
        },
        servers: [
            { 
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{ bearerAuth: [] }] // Aplica la seguridad globalmente en Swagger
    },
    // Le decimos a Swagger dónde buscar los comentarios para autogenerar la vista
    apis: ['./src/presentation/routes/*.js'], 
};

export default swaggerJSDoc(options);