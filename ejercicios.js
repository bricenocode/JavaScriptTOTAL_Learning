const func = () => {
  return "Hola"
}

const saludo = (nombre) => "Hola " + nombre;

console.log(func())
console.log(saludo("Miguel"))

//Con esto vemos como funciona el closure 
//y la independencia de funciones
function contador(){
  let cuenta = 0
  return function() {
    cuenta++
    return cuenta
  }
}

const contador1 = contador()
const contador2 = contador()

console.log(contador1())
console.log(contador2())
console.log(contador1())
console.log(contador1())
console.log(contador1())
console.log(contador2())

const primerArray = [1,2,3]
const segundoArray = [3,4,5]
const [n1,n2,n3] = primerArray
console.log(n2)


const arraysConcatenados = primerArray.concat(segundoArray)
console.log(arraysConcatenados)

function procesarPedido(pedidos) {
  console.log(pedidos)
  const nombreCliente = pedidos.shift()
  console.log(pedidos)
  pedidos.unshift("bebida")
  console.log(pedidos)
  pedidos.push(nombreCliente)
  return pedidos
}
console.log(procesarPedido(['cocacola', 'pizza']))

const listaNumeros = [1,2,3,4,5,6,7,8,9,10]
function sumarPares(numeros) {
  let suma = 0
  numeros.forEach( (n) => {
    if(n%2===0)
      suma += n
  })
  return suma
}
console.log(sumarPares(listaNumeros))

const palabras = ["Venezuela","Libre","!"]
function acabanEnA(words) {
  let pasaValidacion = true
  words.forEach( n => {
    if(!n.endsWith("a"))
      pasaValidacion = false
  })
  return pasaValidacion
}

console.log(acabanEnA(palabras))


/*
Recibes una lista de números. Debes ordenar los números de menor a mayor según su valor absoluto. Eso quiere decir que los números negativos pierden el signo y se ordenan como si fueran positivos.


Por ejemplo, si recibes [5, -10, -2, -25, -7] deberías devolver [-2, 5, -7, -10, -25].


Puedes usar el método Math.abs(num) para obtener el valor absoluto de un número.
*/
const numeroDesordenados = [5, -10, -2, -25, -7]
function sortAbsoluteNumbers(numbers) {
    return numbers.sort((a,b) => {
      return Math.abs(a) - Math.abs(b)
    })
  }

console.log(sortAbsoluteNumbers(numeroDesordenados))

/*
Recibes dos parámetros: una lista de palabras words y una palabra word. Primero, busca el índice de la palabra en la lista. Después, usa ese índice (que será un número) y devuelve todas las palabras de words que sean más largas (length) que el número del índice.


Ten en cuenta que la palabra word siempre existirá en el array, por lo que no es necesario comprobar si existe o no.
*/
const pals = ["Cala","Soto","Amigo"]
const pal = "Cala"
function buscaPalabras(words, word) {
  const posicion = words.indexOf(word)
  const palabrasMasLargas = [...words]
  return palabrasMasLargas.filter(p => p.length>posicion)
}

console.log(buscaPalabras(pals, pal))


/*
Recibimos una matriz de cadenas de texto. Tenemos que localizar la posición de la palabra "JavaScript" en la matriz y devolver su posición como un array de dos elementos: el índice de la fila y el índice de la columna.

const matrix = [
  ['HTML', 'CSS', 'JavaScript'],
  ['Java', 'C++', 'Python'],
  ['Ruby', 'Go', 'Swift']
]

const position = findJavaScript(matrix)
console.log(position) // -> [0, 2]
Si no encuentra la palabra debe devolver [-1, -1]. Usa el siguiente código como punto de partida:
*/

const matrix = [
  ['HTML', 'CSS', 'JavaScript'],
  ['Java', 'C++', 'Python'],
  ['Ruby', 'Go', 'Swift']
]

function findJavaScript(matrix) {
  let encontrado = [-1,-1]
  matrix.forEach((a,pos1) => {
    a.forEach((b,pos2) => {
      if(b === "JavaScript"){
        encontrado = [pos1, pos2]
      } 
    })
  })
  return encontrado
}
const position = findJavaScript(matrix)
console.log(position) // -> [0, 2]


/* OBJETOS */
const persona = {
  name: 'Dani',
  age: 30,
  isWorking: true,
  family: ['Miguel', 'Maria'],
  address: {
    street: 'Calle de la piruleta',
    number: 13,
    city: 'Barcelona'
  },
  walk: function () { // <- método
    console.log('Estoy caminando')
  }
}

/*
Tenemos una función que recibe dos parámetros. name y subs. Haz que la función devuelva un objeto con la siguiente información:

- name con el valor del parámetro name
- subscribers con el valor del parámetro subs
- hash, con el valor de la longitud del string name multiplicado por el parámetro subs
- Un método getStatus que devuelva el texto El canal de <name> tiene <subs> suscriptores. Por ejemplo, para name = 'Dani' y subs = 100, el método getStatus devolvería El canal de Dani tiene 100 suscriptores.

¡Ojo! El método getStatus debe devolver el texto, NO imprimirlo por consola.
*/

function createObject(name, subs) {
  return {
    name: name,
    subscribers: subs,
    hash: name.length * subs,
    getStatus: () => `El canal de ${name} tiene ${subs} suscriptores`
  }
}

console.log(createObject("Miguel", 100))
console.log(createObject("Luisa", 200).getStatus())

//Objeto con prototipo
const conPrototipo = {}
console.log(conPrototipo)

//Como crer un objeto sin prototipo
const sinPrototipo = Object.create(null)
console.log(sinPrototipo)


// Las clases con la mejorar forma de controlar los objetos
class Temperatura {
  constructor(celsius = 0) {
    this._celsius = celsius // Convención: _ para propiedades "privadas"
  }

  // Getter - se usa como propiedad
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32
  }

  // Setter - se usa como asignación
  set fahrenheit(valor) {
    this._celsius = ((valor - 32) * 5) / 9
  }

  get celsius() {
    return this._celsius
  }

  set celsius(valor) {
    if (valor < -273.15) {
      throw new Error('Temperatura no puede ser menor a -273.15°C')
    }
    this._celsius = valor
  }
}

const temp = new Temperatura(25)

/*
Crea una clase Producto que:

Tenga constructor con nombre, precio y categoria
Tenga un getter precioConIVA que añada 21% de IVA
Tenga un setter precio que valide que el precio sea mayor a 0
Tenga un método aplicarDescuento(porcentaje) que reduzca el precio
Tenga un método estático compararPrecios(producto1, producto2) que retorne el más barato
*/

class Producto {
    constructor(nombre, precio, categoria) {
      this.nombre = nombre
      this._precio = precio
      this.categoria = categoria
    }

    get precioConIVA() {
      return this._precio * 0.21
    }

    set precio(value) {
      if(value > 0){
        this._precio = value
      }
    }

    aplicarDescuento(porcentaje) {
      this._precio = precio * (porcentaje/100)
    }

    static compararPrecios(producto1, producto2) {
      if(producto1.precioConIVA > producto2.precioConIVA){
        return producto2
      }
      return producto1
    }

  }

const prod = new Producto("Pant", 45, "Ropa")
const prod2 = new Producto("Pantalon", 50, "Ropa")
console.log(Producto.compararPrecios(prod, prod2))

/*
-------- EXTENDS ------------------------------------------
La principal ventaja de las clases es que simplifican enormemente la herencia de objetos gracias a la palabra clave extends. Vamos a crear una clase Animal, que será la clase padre, y una clase Perro, que será la clase que herede de Animal.
*/


class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }

  dormir() {
    console.log(`${this.nombre} está durmiendo`)
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre) // Llama al constructor del padre
    this.raza = raza
  }

  ladrar() {
    console.log(`${this.nombre} dice: ¡Guau!`)
  }
}

const rex = new Perro('Rex', 'Labrador')
rex.dormir() // "Rex está durmiendo" (heredado)
rex.ladrar() // "Rex dice: ¡Guau!" (propio)




class Empleado {
  constructor(nombre, salario) {
    this.nombre = nombre
    this.salario = salario
  }

  trabajar() {
    console.log(`${this.nombre} está trabajando`)
  }

  cobrar() {
    console.log(`${this.nombre} cobra ${this.salario}€`)
  }
}

class Programador extends Empleado {
  constructor(nombre, salario, lenguaje) {
    super(nombre, salario) // Llama al constructor padre
    this.lenguaje = lenguaje
  }

  // Sobrescribe el método del padre
  trabajar() {
    super.trabajar() // Llama al método padre
    console.log(`Programando en ${this.lenguaje}`)
  }

  // Método propio
  programar() {
    console.log(`${this.nombre} está programando en ${this.lenguaje}`)
  }
}

class Manager extends Empleado {
  constructor(nombre, salario, equipo) {
    super(nombre, salario)
    this.equipo = equipo
  }

  trabajar() {
    super.trabajar()
    console.log(`Gestionando un equipo de ${this.equipo.length} personas`)
  }

  dirigir() {
    console.log(`${this.nombre} está dirigiendo el equipo`)
  }
}

const dev = new Programador('Ana', 45000, 'JavaScript')
const jefe = new Manager('Carlos', 60000, ['Ana', 'Luis', 'María'])

dev.trabajar()
// "Ana está trabajando"
// "Programando en JavaScript"

jefe.trabajar()
// "Carlos está trabajando"
// "Gestionando un equipo de 3 personas"

dev.cobrar() // "Ana cobra 45000€" (heredado)
jefe.dirigir() // "Carlos está dirigiendo el equipo" (propio)



/*
====================================
====== PROMISES AND CALLBACKS ======
====================================

Un callback es simplemente una función que se pasa como parámetro a otra función, para que sea ejecutada en un momento específico (normalmente cuando algo termina de ejecutarse).

La palabra "callback" significa "llamar de vuelta" - es decir, "cuando termines, llámame de vuelta".
*/

function saludar(nombre) {
  console.log('¡Hola, ' + nombre + '!')
}

function despedir(nombre) {
  console.log('¡Adiós, ' + nombre + '!')
}

function procesarUsuario(nombre, callback) {
  console.log('Procesando usuario...')
  callback(nombre) // Ejecutamos el callback
}

// Usamos diferentes callbacks
procesarUsuario('Ana', saludar)
// Procesando usuario...
// ¡Hola, Ana!

procesarUsuario('Luis', despedir) 
// Procesando usuario...
// ¡Adiós, Luis!


//Callbacks con parámetros
function esperarUnSegundo(callback) {
  setTimeout(() => {
    const mensaje = "¡Ya pasó 1 segundo!";
    callback(mensaje); // Le pasamos un parámetro al callback
  }, 1000);
}

function mostrarMensaje(texto) {
  console.log(texto);
}

// Aquí llamamos a la función y le pasamos el callback
esperarUnSegundo(mostrarMensaje);


console.log("\n\n\n\n\n\n\n\nERRORES ABAJO\n\n\n\n\n\n\n\n\n\n\n")

//setInterval: Callbacks Repetitivos
let segundos = 0

const intervalo = setInterval(() => {
  segundos++
  console.log('Han pasado', segundos, 'segundos')
  
  if (segundos >= 5) {
    clearInterval(intervalo) // Detenemos el intervalo
    console.log('¡Tiempo terminado!')
  }
}, 1000) // Cada 1 segundo (1000ms)

//El Callback Hell 🔥
getUser(1, (user) => {
  console.log("Usuario:", user.name)

  getPosts(user.id, (posts) => {
    console.log("Posts del usuario:", posts)

    getComments(posts[0].id, (comments) => {
      console.log("Comentarios del primer post:", comments)

      getLikes(comments[0].id, (likes) => {
        console.log("Likes del primer comentario:", likes)
        // ... y así hasta el infinito y más allá...
      })
    })
  })
})

/*
En definitiva... ¿qué son los callbacks?
Son **funciones que se pasan como parámetros a otras funciones
Se ejecutan cuando algo termina (de ahí "llamar de vuelta")
Base fundamental de la programación asíncrona
*/


/*
¿Qué es una Promise?
Imagina que pides una pizza por teléfono. La pizzería te da un número de pedido (esa es tu Promise). Este número no es la pizza en sí, pero es una promesa de que eventualmente recibirás tu pizza.

Con ese número de pedido puedes:

Esperar a que llegue la pizza (pending)
Recibirla cuando el repartidor llega (fulfilled)
Enterarte de que no pueden entregarla (rejected)
En JavaScript, una Promise funciona exactamente igual: es un objeto que representa un valor futuro que aún no conocemos, pero que eventualmente estará disponible.

¿Por qué son importantes las Promises?
Las Promises resuelven tres problemas fundamentales de los callbacks:

📚 Callback Hell: Ya no necesitas anidar funciones infinitamente
🎯 Manejo de errores centralizado: Un solo .catch() captura todos los errores
🔗 Composición elegante: Puedes encadenar operaciones de forma legible
Los tres estados de una Promise
Una Promise siempre está en uno de estos tres estados:

⏳ Pending (Pendiente): Estado inicial, la operación aún no ha terminado
✅ Fulfilled (Cumplida): La operación se completó exitosamente
❌ Rejected (Rechazada): La operación falló
Diagrama: El ciclo de vida de una Promise
┌─────────────────────────────────────────────────────┐
│                   PROMISE                           │
│                                                     │
│  PENDING ─────---─────┐                             │
│   (Pendiente)         │                             │
│                       │                             │
│                       ├─── ✔︎ FULFILLED              │
│                       │    (Cumplida)               │
│                       │                             │
│                       └─── ✖︎ REJECTED               │
│                            (Rechazada)              │
│                                                     │
└─────────────────────────────────────────────────────┘
Dato importante: Una vez que una Promise cambia de estado (se resuelve o rechaza), no puede cambiar de nuevo. Es inmutable. Si se resolvió, siempre estará resuelta con ese valor.

Creando tu primera promesa
Vamos a crear una Promise desde cero para entender cómo funciona internamente. Para ello usaremos el constructor de Promises de JavaScript. Dentro de este constructor, pasaremos una función que será el ejecutor de la Promise. Esta función recibirá dos parámetros: resolve y reject con las que indicaremos si la Promise se resuelve o rechaza.
*/

const miPromesa = new Promise((resolve, reject) => {
  // Simulamos una operación que toma tiempo
  console.log('🔄 La Promise está pendiente...')
  
  setTimeout(() => {
    const exito = true // Cambia esto a false para ver el rechazo
    
    if (exito) {
      console.log('✅ Resolviendo la Promise...')
      resolve('¡Operación exitosa!') // Cumplimos la promesa
    } else {
      console.log('❌ Rechazando la Promise...')
      reject('Algo salió mal') // Rechazamos la promesa
    }
  }, 2000)
})

console.log('Promise creada:', miPromesa)

// Consumir la Promise
miPromesa
  .then(resultado => console.log('Resultado:', resultado))
  .catch(error => console.log('Error:', error))

/*
Consumiendo Promises: .then() y .catch()
Una vez que tienes una Promise, necesitas consumirla para obtener su valor. Para esto usamos dos métodos fundamentales:

.then(): Se ejecuta cuando la Promise se resuelve exitosamente
.catch(): Se ejecuta cuando la Promise se rechaza con un error
¿Cómo funcionan .then() y .catch()?
Estos métodos son como suscripciones a eventos futuros. Le dices a JavaScript: "cuando esta Promise termine, ejecuta esta función".  
*/

function crearPromesa(exito) {
  return new Promise((resolve, reject) => {
    console.log('⏳ Procesando...')
    
    setTimeout(() => {
      if (exito) {
        resolve('¡Todo salió bien! 🎉')
      } else {
        reject('UNA CALAMIDAD 💥')
      }
    }, 1000)
  })
}

// Consumiendo la promesa exitosa
crearPromesa(true)
  .then((resultado) => {
    console.log('✅ Éxito:', resultado)
    return resultado.toUpperCase() // Puedes transformar el valor
  })
  .then((resultadoMayusculas) => {
    console.log('📝 Transformado:', resultadoMayusculas)
    // -> 📝 Transformado: ¡TODO SALIÓ BIEN! 🎉
  })
  .catch((error) => {
    // Esto nunca se ejecutará porque la promesa se resuelve exitosamente
    console.log('❌ Error:', error)
  })

// Probando con error (después de 2 segundos)
crearPromesa(false)
  .then((resultado) => {
    console.log('✅ Éxito:', resultado)
  })
  .catch((error) => {
    console.log('❌ Error capturado:', error)
    // -> 🔴 Error capturado: UNA CALAMIDAD 💥
  })

  
/*
====================================
====== TRY CATCH ===================
====================================
*/

try {
  // Código que podría generar un error
  console.log("Intentando ejecutar código...")
  console.log(variableQueNoExiste) // ❌ ReferenceError: variableQueNoExiste is not defined
} catch (error) {
  // Código que se ejecuta si hay un error
  console.log("¡Ocurrió un error!", error.message)
}

console.log("El programa continúa ejecutándose") // ✅ Esta línea sí se ejecuta

/*
try: JavaScript intenta ejecutar el código dentro del bloque try
Si no hay errores, el bloque catch se omite
Si hay un error, JavaScript inmediatamente salta al bloque catch
El programa continúa después del bloque catch


catch sin parámetro
Desde las últimas versiones de JavaScript, puedes omitir el parámetro error en el bloque catch:
*/

try {
  console.log(variableQueNoExiste) // ❌ ReferenceError: variableQueNoExiste is not defined
} catch {
  console.log("¡Ocurrió un error!")
}

try {
  // Código que puede fallar
  console.log("Ejecutando código...")
} catch (error) {
  // Manejo de errores
  console.log("Error:", error.message)
} finally {
  // ✅ Este código SIEMPRE se ejecuta
  console.log("Limpieza completada")
}

// ======= ERRORES PERSONALIZADOS =================
// En lugar de dejar que esto cause un error genérico:
function dividir(a, b) {
  return a / b // Si b es 0, devuelve Infinity (no es útil)
}

// Podemos lanzar un error personalizado:
function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por cero")
  }
  return a / b
}

function validarEdad(edad) {
  if (edad < 0) {
    throw new Error("La edad no puede ser negativa")
  }
  
  if (edad > 150) {
    throw new Error("La edad parece incorrecta")
  }
  
  return edad
}

try {
  console.log(validarEdad(25))  // 25
  console.log(validarEdad(-5))  // ❌ Error: La edad no puede ser negativa
  console.log(validarEdad(200)) // Esta línea nunca se ejecuta
} catch (error) {
  console.log("Error:", error.message)
}

// EJEMPLOS PRÁCTICOS
function crearUsuario(datos) {
  // Validar que se proporcionen los datos
  if (!datos) {
    throw new Error("Los datos del usuario son requeridos")
  }
  
  // Validar email
  if (!datos.email || !datos.email.includes("@")) {
    throw new Error("Se requiere un email válido")
  }
  
  return {
    id: Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    edad: datos.edad
  }
}

// Uso con manejo de errores
try {
  crearUsuario({
    nombre: "midu",
    email: "correo-inválido",
    edad: 16
  })
} catch (error) {
  console.log("Error creando usuario:", error.message)
}


// TAMBIÉN ESTÁN ESTOS TIPOS
// TypeError para errores de tipos
throw new TypeError("Se esperaba un string, se recibió un number")

// RangeError para valores fuera de rango
throw new RangeError("El valor debe estar entre 1 y 100")

// ReferenceError para referencias inválidas
throw new ReferenceError("La variable no está definida")