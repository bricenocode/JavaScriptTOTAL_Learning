import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema operativo:')
console.log('Tipo de SO:', os.type())
console.log('Plataforma:', os.platform())
console.log('Arquitectura:', os.arch())
console.log('Memoria total (bytes):', os.totalmem())
console.log('Memoria libre (bytes):', os.freemem())
console.log('Directorio home del usuario:', os.homedir())
console.log('Directorio temporal:', os.tmpdir())
console.log('Tiempo de actividad (segundos):', ms(os.uptime() * 1000, { long: true }))
console.log('Información de la CPU:', os.cpus())
console.log('Interfaces de red:', os.networkInterfaces())
console.log('Nombre del host:', os.hostname())
console.log('Zona horaria del sistema:', Intl.DateTimeFormat().resolvedOptions().timeZone)
console.log('Número de núcleos de CPU:', os.cpus().length)
console.log('Fin de la información del sistema operativo.')
