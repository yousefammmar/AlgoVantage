import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.js';
import { apiLimiter, errorHandler } from './middlewares/index.js';
import apiRoutes from './api/routes/api.route.js';

const app = express();

// Security and Utility Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan('dev'));
app.use(express.json());

// Apply global rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Production-ready server running on port ${config.port} [${config.nodeEnv}]`);
});
