const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify OpenAPI version
        info: {
            title: 'Your API Title', // Title for the documentation
            version: '1.0.0', // Version of your API
            description: 'API documentation for your application', // Description of the API
            contact: {
                name: 'Your Name or Team', // Contact name
                email: 'your.email@example.com', // Contact email
            },
        },
        servers: [
            {
                url: 'http://localhost:3000', // Local development server
                description: 'Local server',
            },
            {
                url: 'https://your-production-url.com', // Production server
                description: 'Production server',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'], // Path to the files with API routes (JSDoc comments)
};

export default swaggerOptions;
