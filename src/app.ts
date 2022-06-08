import express, { Request, Response } from 'express';
import cors from 'cors';

import Routes from './routes';

// Start express app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send({ message: "demo's Server is Running..." });
});

app.use('/api/v1/users', Routes.userRoutes);
app.use('/api/v1/news', Routes.newsRoutes);
app.use('/api/v1/technology', Routes.technologyRoutes);

//default routes
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
