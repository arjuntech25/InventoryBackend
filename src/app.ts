import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connection';

import swaggerOptions from './swaggerConfig';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


import  activityLogRoutes  from './routes/activityLog/activityLogRoutes';
//import emailNotificationRoutes from './routes/emailNotification/emailNotificationRoutes';
//import reportPreferenceRoutes from './routes/reportPreference/reportPreferenceRoutes';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory App!');
});


// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use activity log routes
app.use('/api/activityLogs', activityLogRoutes);

// Use email notification routes
//app.use('/api/emailNotification', emailNotificationRoutes);

// Use report preferences routes
//app.use('/api/reportPreference', reportPreferenceRoutes);

const startServer = async () => {
    const mongoDbUri = process.env.MONGODB_URI;
    const mongoDbName = process.env.MONGODB_NAME;

    if (!mongoDbUri || !mongoDbName) {
        throw new Error('MONGODB_URI or MONGODB_NAME are not defined!');
    }
    try {
        await connectDB(mongoDbUri, mongoDbName);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
