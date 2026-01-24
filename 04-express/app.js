import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { jobsRouter } from './routes/jobs.js';

const PORT = process.env.PORT || 1234;
const app = express();

// Esto es para permitir CORS
app.use(corsMiddleware);
// Esto se usa para parsear el body de las peticiones como JSON
app.use(express.json());

app.use('/jobs', jobsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/health', (req, res) => {
  res.json(
    { 
      status: 'ok',
      uptime: process.uptime() 
    });
});


