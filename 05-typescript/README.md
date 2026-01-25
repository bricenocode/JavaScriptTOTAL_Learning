# 📘 Guía Maestra de TypeScript: De Bases a Conceptos Avanzados

Esta guía cubre los pilares fundamentales de TypeScript, desde el tipado básico hasta la validación en tiempo de ejecución con Zod y el manejo de tipos complejos.

# 0. Visualización y ejecución del código en consola

```bash 
npm install tsx
```

```bash 
npx tsx index.ts
```
---

## 1. Bases y Tipado Primitivo

TypeScript permite definir tipos de forma explícita, aunque cuenta con un potente motor de **inferencia**.

```typescript
// Declaración con tipos explícitos
let nombre: string = "Juan";
let edad: number = 30;
let esDesarrollador: boolean = true;

// Tipado en funciones (parámetros y retorno)
function saludar(nombre: string, edad: number): string {
    return `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;
}

```

---

## 2. Estructuras de Datos de Objetos

Para definir la "forma" de un objeto, usamos `interface` o `type`.

### Interface vs Type

| Característica | Interface | Type |
| --- | --- | --- |
| **Extensibilidad** | Se pueden fusionar (declaración abierta). | No se pueden reabrir para añadir propiedades. |
| **Uso principal** | Definir la estructura de objetos y clases. | Alias para uniones, tuplas y tipos primitivos. |

```typescript
interface Persona {
    nombre: string;
    edad: number;
    esDesarrollador: boolean;
}

// Propiedades opcionales (?)
interface Producto {
    nombre: string;
    precio: number;
    descripcion?: string; // No es obligatoria
}

```

---

## 3. Tipos Especiales y Colecciones

### Tuplas y Enums

* **Tuplas:** Arrays con un número fijo de elementos y tipos específicos por posición.
* **Enums:** Permiten definir un conjunto de constantes con nombre. `const enum` es más eficiente ya que no genera código de objeto en JS.

```typescript
// Tupla
let coordenadas: [number, number] = [10, 20];

// Enums
enum Color { Rojo, Verde, Azul }
const enum DireccionEnum { Norte, Sur, Este, Oeste } // Desaparece en el JS resultante

```

### Tipos de Control

* **any:** Desactiva el chequeo de tipos (evitar en lo posible).
* **void:** La función no retorna nada.
* **never:** La función nunca termina (errores o bucles infinitos).
* **unknown:** Tipo seguro que requiere validación antes de usarse.

---

## 4. Tipos Avanzados y Lógica

### Uniones e Intersecciones

* **Unión (`|`):** La variable puede ser de un tipo u otro.
* **Intersección (`&`):** Combina múltiples tipos en uno solo.

```typescript
// Unión
let identificador: string | number = "ABC";

// Intersección
type PersonaDesarrolladora = Persona & { lenguajeFavorito: string };

```

### Genéricos (`<T>`)

Permiten crear componentes reutilizables que funcionan con varios tipos sin perder la seguridad de tipado.

```typescript
function obtenerArray<T>(elementos: T[]): T[] {
    return new Array().concat(elementos);
}
const numeros = obtenerArray<number>([1, 2, 3]);

```

---

## 5. Manipulación de Tipos (Utility Types)

### Mapped Types y Condicionales

Podemos crear nuevos tipos basados en otros existentes.

```typescript
// Mapped Type: Convierte todas las propiedades en opcionales
type Opcional<T> = {
    [P in keyof T]?: T[P];
};

// Tipo Condicional
type EsNumero<T> = T extends number ? "Es un número" : "No es un número";

```

---

## 6. Estrechamiento de Tipos (Narrowing)

El **Narrowing** es el proceso de refinar un tipo hacia uno más específico.

### Type Guards

Funciones especiales que devuelven un predicado de tipo (`variable is Tipo`).

```typescript
interface Mario { compañia: "Nintendo"; saltar: () => string }
interface Sonic { compañia: "SEGA"; correr: () => string }

function esMario(personaje: Mario | Sonic): personaje is Mario {
    return personaje.compañia === "Nintendo";
}

```

---

## 7. Integración con APIs y Validación (Zod)

TypeScript solo valida en **tiempo de compilación**. Para validar datos externos (como una API) en **tiempo de ejecución**, usamos librerías como **Zod**.

```typescript
import { z } from "zod";

const UserSchema = z.object({
    id: z.number(),
    nombre: z.string()
});

// En el fetch
const response = await fetch(API_URL);
const data = await response.json();
const validatedData = UserSchema.parse(data); // Lanza error si los datos no coinciden

```

---

## 8. Programación Orientada a Objetos (POO)

TypeScript añade modificadores de acceso a las clases de JavaScript:

* **public:** Accesible desde cualquier lugar (por defecto).
* **protected:** Accesible desde la clase y sus subclases.
* **private:** Accesible solo dentro de la clase.

```typescript
class Animal {
    public nombre: string;
    protected edad: number;
    private especie: string;

    constructor(nombre: string, edad: number, especie: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.especie = especie;
    }
}

```

## 9. Interfaces en Clases
Las interfaces pueden actuar como "contratos" que las clases deben cumplir obligatoriamente.

```typescript
interface Volador {
  volar(): string;
}

class Pajaro implements Volador {
  private especie: string;
  constructor(especie: string) {
    this.especie = especie;
  }

  public volar(): string {
    return `El ${this.especie} está volando.`;
  }
}
```

