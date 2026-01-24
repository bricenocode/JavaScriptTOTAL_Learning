import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  // Esto es para permitir que local pueda entrar 
  undefined
];

export const corsMiddleware = cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));       
    }});