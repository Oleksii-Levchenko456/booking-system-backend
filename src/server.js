// src/server.js
import express from 'express';
import cors from 'cors';
import { conectMongoDB } from './db/conectMongoDb.js';
import pino from 'pino-http';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import usersRoutes from './routes/usersRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/bookings', authMiddleware, bookingsRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await conectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
