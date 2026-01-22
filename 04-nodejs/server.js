import { createServer } from 'http';
import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { json } from 'node:stream/consumers';

process.loadEnvFile() // leer automáticamente el archivo .env
const port = process.env.PORT ?? 3000; //Si pones 0 el sistema asigna un puerto libre automáticamente.
                                      // Por eso utilizamos la variable de entorno

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

const users = [
  { id: 1, name: 'midudev' },
  { id: 2, name: 'pepe' },
  { id: 3, name: 'juan' },
  { id: 4, name: 'maria' },
  { id: 5, name: 'luis' },
  { id: 6, name: 'ana' },
  { id: 7, name: 'carlos' },
];
const server = createServer( async (req, res) => {
  const { method, url } = req;
  const [ pathname, queryString ] = url.split('?');

  // Con esto podemos manejar los query params de la URL
  const searchParams = new URLSearchParams( queryString );

  if( method === 'GET' ) {    
    if( pathname === '/' ) 
    return sendJson(res, 200, { message: 'Hello World' });
    if( pathname === '/users' ) {

      if(Number.isNaN( Number( searchParams.get('limit') ) ) || 
        Number.isNaN( Number( searchParams.get('offset') ) ) || 
        Number(searchParams.get('limit')) < 0 || 
        Number(searchParams.get('offset')) < 0
       ){
        return sendJson(res, 400, { error: 'Los parámetros limit y offset deben ser números enteros positivos' });
      }

      // Esta es la manera de limitar la cantidad de usuarios que devolvemos
      // mediante un query param llamado limit
      const limit =  Number(searchParams.get('limit')) || users.length;
      // El offset es para saltarnos los primeros n usuarios
      const offset = Number(searchParams.get('offset')) || 0;
      const paginatedUsers = users.slice(offset, offset + limit);
      return sendJson(res, 200, paginatedUsers);
    }
    // Esto es usado para monitorizar el estado del servidor, si lleva mucho
    // tiempo, significa que el servidor es estable.
    if( pathname === '/health' )
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
  }
  if( method === 'POST' ) {
    if( pathname === '/users' ) {
      // Crearemmos un nuevo usuario
      const body = await json(req);

      if( !body || !body.name ) {
        return sendJson(res, 400, { error: 'El nombre es obligatorio' });
      }

      const newUser = {
        id: randomUUID(),
        name: body.name
      }
      users.push(newUser);
      return sendJson(res, 201, {message: 'Usuario creado correctamente'});
    }
  }
  return sendJson(res, 404, { error: 'Not Found' });
});


server.listen(port, () => {
  console.log(`Server is running at http://localhost:${server.address().port}/`);
});