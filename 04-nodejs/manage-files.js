import {readFile, writeFile, mkdir} from 'node:fs/promises'
import { join, basename, extname } from 'node:path' //Trabajar con rutas para ser ajenos al sistema operativa.


let pathToWrite = ''

if(process.permission.has('fs.write', 'arhivo-uppercase.txt')){
  const mensaje = "Hola mundo escrito en un fichero!"
  const fileName = "archivo-uppercase.txt"
  const outputDir = join('output','files','documents') //Hace que tu ruta sirva para Linux, macOS o Windows sin preocuparte.
  await mkdir(outputDir, {recursive:true})
  console.log('Carpetas creadas!')

  const uppercaseContent = mensaje.toUpperCase()
  pathToWrite = join(outputDir, fileName)
  await writeFile(pathToWrite, uppercaseContent)
  console.log('Archivo creado en mayusculas!')

}else{
  console.log('No tienes permisos para escribir en el sistema de ficheros.')
}

if(process.permission.has('fs.read', 'archivo-uppercase.txt')){
  const contentReader = await readFile(pathToWrite, 'utf-8')
  console.log("Contenido del fichero: " + contentReader)

  console.log("La extensión es: " + extname(pathToWrite))
  console.log("El nombre del archivo es: " + basename(pathToWrite))
}else{
  console.log('No tienes permisos para leer en el sistema de ficheros.')
}
  