// Bases de typeScript

import { ApiGitHubRepositoriesResponse } from "./tipadoZod";


// Declaración de variables con tipos explícitos
// Esto no es estrictamente necesario, TypeScript infiere los tipos automáticamente
let nombre: string = "Juan";
let edad: number = 30;
let esDesarrollador: boolean = true;



// Función con tipos de parámetros y tipo de retorno
function saludar(nombre: string, edad: number): string {
    return `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;
}
console.log(saludar(nombre, edad));



// Interfaz para definir la forma de un objeto
interface Persona {
    nombre: string;
    edad: number;
    esDesarrollador: boolean;
}

/*
 Diferencia entre Type e Interface: 
 type Persona = {
     nombre: string;
     edad: number;
     esDesarrollador: boolean;
 };
 Ambas sirven para definir la forma de un objeto,
 pero las interfaces pueden ser extendidas y fusionadas,
 mientras que los tipos no pueden ser reabiertos para 
 agregar nuevas propiedades después de su creación.
 Pero en cuanto a rendimiento y funcionalidad, ambos son muy similares y
 la elección entre uno u otro a menudo depende de las 
 preferencias del desarrollador o del equipo.
*/


const persona: Persona = {
    nombre: "Ana",
    edad: 25,
    esDesarrollador: false
};

console.log(persona);

// Tipo genérico
function obtenerArray<T>(elementos: T[]): T[] {
    return new Array().concat(elementos);
}
const numeros = obtenerArray<number>([1, 2, 3, 4, 5]);
const cadenas = obtenerArray<string>(["a", "b", "c"]);
console.log(numeros);
console.log(cadenas);



// Tipo tupla
let coordenadas: [number, number] = [10, 20];
console.log(`Coordenadas: X=${coordenadas[0]}, Y=${coordenadas[1]}`); 



// Enum
enum Color {
    Rojo,
    Verde,
    Azul
}
let colorFavorito: Color = Color.Verde;
console.log(`Color favorito: ${Color[colorFavorito]}`);

// Esto genera más codigo en tiempo de compilación debido a la creación del objeto enum.
// La manera de que esto no ocurra es usar const enum
const enum DireccionEnum {
    Norte,
    Sur,
    Este,
    Oeste
}
let direccionFavoritaConst: DireccionEnum = DireccionEnum.Este;
console.log(`Dirección favorita (const enum): ${direccionFavoritaConst}`);


// Tipo any (evitar su uso en la medida de lo posible)
let valorDesconocido: any = "Hola";
console.log(valorDesconocido);
valorDesconocido = 42;
console.log(valorDesconocido);



// Tipo void en funciones que no retornan valor
function mostrarMensaje(mensaje: string): void {
    console.log(mensaje);
}
mostrarMensaje("Este es un mensaje de tipo void.");



// Tipo never en funciones que nunca retornan
function lanzarError(mensaje: string): never {
    throw new Error(mensaje);
}

// lanzarError("Este es un error de tipo never."); 
// Comentado para evitar la interrupción del flujo del programa


// Tipo null y undefined  
let valorNulo: null = null;
let valorIndefinido: undefined = undefined;
console.log(`Valor nulo: ${valorNulo}, Valor indefinido: ${valorIndefinido}`);


// Tipo opcional en propiedades de objetos
interface Producto {
    nombre: string;
    precio: number;
    descripcion?: string; // Propiedad opcional
}
const producto1: Producto = {
    nombre: "Laptop",
    precio: 1500
};
const producto2: Producto = {
    nombre: "Teléfono",
    precio: 800,
    descripcion: "Un teléfono inteligente de última generación."
};
console.log(producto1);
console.log(producto2);


// Aserciones de tipo
let algunValor: unknown = "Esto es una cadena";
let longitudCadena: number = (algunValor as string).length;
console.log(`Longitud de la cadena: ${longitudCadena}`);

  // Esto puede ser delicado si el tipo real no coincide con la aserción,
  // por lo que se debe usar con precaución.
  //const canvas = document.getElementById("miCanvas");
  // Esto es más seguro que una aserción directa, 
  // ya que verifica el tipo en tiempo de ejecución
 /*  if(canvas instanceof HTMLCanvasElement) {
      const contexto = canvas.getContext("2d");
      console.log(contexto);
  } */

// Tipo literal
type Direccion = "Norte" | "Sur" | "Este" | "Oeste";
let direccionFavorita: Direccion = "Norte";
console.log(`Dirección favorita: ${direccionFavorita}`);


// Tipo unión
let identificador: string | number;
identificador = "ABC123";
console.log(identificador);
identificador = 456789;
console.log(identificador);


// Tipo de intersección
interface A {
    propA: string;
}
interface B {
    propB: number;
}
type AB = A & B;
const objetoAB: AB = {
    propA: "Hola"
    , propB: 42
};
console.log(objetoAB);  


// Tipo de función
type Operacion = (x: number, y: number) => number;
const sumar: Operacion = (x, y) => x + y;
console.log(`Suma: ${sumar(5, 10)}`);


// Tipo de índice
interface Diccionario {
    [key: string]: string;
}
const diccionario: Diccionario = {
    "clave1": "valor1",
    "clave2": "valor2"
};
console.log(diccionario);


// Tipo condicional
type EsNumero<T> = T extends number ? "Es un número" : "No es un número";
const Resultado1 : EsNumero<number> = "Es un número";
const Resultado2 : EsNumero<string> = "No es un número";
console.log(`Resultado1: ${Resultado1}, Resultado2: ${Resultado2}`);


// Mapped Types
type Opcional<T> = {
    [P in keyof T]?: T[P];
};
interface Usuario {
    id: number;
    nombre: string;
    email: string;
}
type UsuarioOpcional = Opcional<Usuario>;
const usuario1: UsuarioOpcional = {
    id: 1,
    nombre: "Carlos"
  };
console.log(usuario1);
const usuario2: UsuarioOpcional = {
    email: "carlos@example.com"
};
console.log(usuario2);

// ESTO ESTÁ TIPADO EN TIEMPO DE COMPILACIÓN NO EN TIEMPO DE EJECUCIÓN
/* 
export type APIGitHubRepositoriesResponse = {
    total_count:        number;
    incomplete_results: boolean;
    items:              Item[];
}

export type Item = {
    id:                          number;
    node_id:                     string;
    name:                        string;
    full_name:                   string;
    private:                     boolean;
    owner:                       Owner;
    html_url:                    string;
    description:                 null | string;
    fork:                        boolean;
    url:                         string;
    forks_url:                   string;
    keys_url:                    string;
    collaborators_url:           string;
    teams_url:                   string;
    hooks_url:                   string;
    issue_events_url:            string;
    events_url:                  string;
    assignees_url:               string;
    branches_url:                string;
    tags_url:                    string;
    blobs_url:                   string;
    git_tags_url:                string;
    git_refs_url:                string;
    trees_url:                   string;
    statuses_url:                string;
    languages_url:               string;
    stargazers_url:              string;
    contributors_url:            string;
    subscribers_url:             string;
    subscription_url:            string;
    commits_url:                 string;
    git_commits_url:             string;
    comments_url:                string;
    issue_comment_url:           string;
    contents_url:                string;
    compare_url:                 string;
    merges_url:                  string;
    archive_url:                 string;
    downloads_url:               string;
    issues_url:                  string;
    pulls_url:                   string;
    milestones_url:              string;
    notifications_url:           string;
    labels_url:                  string;
    releases_url:                string;
    deployments_url:             string;
    created_at:                  Date;
    updated_at:                  Date;
    pushed_at:                   Date;
    git_url:                     string;
    ssh_url:                     string;
    clone_url:                   string;
    svn_url:                     string;
    homepage:                    null | string;
    size:                        number;
    stargazers_count:            number;
    watchers_count:              number;
    language:                    Language | null;
    has_issues:                  boolean;
    has_projects:                boolean;
    has_downloads:               boolean;
    has_wiki:                    boolean;
    has_pages:                   boolean;
    has_discussions:             boolean;
    forks_count:                 number;
    mirror_url:                  null;
    archived:                    boolean;
    disabled:                    boolean;
    open_issues_count:           number;
    license:                     License | null;
    allow_forking:               boolean;
    is_template:                 boolean;
    web_commit_signoff_required: boolean;
    topics:                      string[];
    visibility:                  Visibility;
    forks:                       number;
    open_issues:                 number;
    watchers:                    number;
    default_branch:              DefaultBranch;
    score:                       number;
}

export enum DefaultBranch {
    Dev = "dev",
    Develop = "develop",
    Main = "main",
    Master = "master",
}

export enum Language {
    CSS = "CSS",
    HTML = "HTML",
    JavaScript = "JavaScript",
    TypeScript = "TypeScript",
}

export type License = {
    key:     string;
    name:    string;
    spdx_id: string;
    url:     null | string;
    node_id: string;
}

export type Owner = {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                Type;
    user_view_type:      Visibility;
    site_admin:          boolean;
}

export enum Type {
    Organization = "Organization",
    User = "User",
}

export enum Visibility {
    Public = "public",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAPIGitHubRepositoriesResponse(json: string): APIGitHubRepositoriesResponse {
        return JSON.parse(json);
    }

    public static aPIGitHubRepositoriesResponseToJson(value: APIGitHubRepositoriesResponse): string {
        return JSON.stringify(value);
    }
}
 */

const API_URL = "https://api.github.com/search/repositories?q=javascript"

const response = await fetch(API_URL)

if ( !response.ok ) {
    throw new Error(`Error en la petición: ${response.status}`)
}
//Este si está tipado gracias a Zod, que si valida en tiempo de ejecución
const data = await response.json() as ApiGitHubRepositoriesResponse
;

const repos = data.items.map(repo => {
  console.log(`
    Nombre: ${repo.name}
    Descripción: ${repo.description}
    URL: ${repo.html_url}
    Owner: ${repo.owner.login}
    Date de creación: ${repo.created_at}
    `)
});

/* Ejemplo de respueta 
    Nombre: javascript-algorithms
    Descripción: 📝 Algorithms and data structures implemented in JavaScript with explanations and links to further readings
    URL: https://github.com/trekhleb/javascript-algorithms
    Owner: trekhleb
    Date de creación: 2018-03-24T07:47:04Z
*/


// Narrowing de tipos 
// Es decir, ir acotando el tipo de una variable.
// Aquí un ejemplo con Zod para validar y definir tipos en tiempo de ejecución.
import { z } from "zod";

export const LanguageSchema = z.enum([
    "CSS",
    "HTML",
    "JavaScript",
    "TypeScript",
]);

const lenguage = LanguageSchema.parse("TypeScript");
console.log(`Lenguaje validado con Zod: ${lenguage}`);

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
console.log(padLeft(4, "Hola"));
console.log(padLeft(">> ", "Hola"));


// Type Guard
// Sirven para crear funciones que permitan
// refinar tipos de manera segura en tiempo de ejecución.
// Comprobando el tipo de una variable.
// Aquí un ejemplo sencillo:

interface Mario {
  compañia: "Nintendo"
  tipo: string
  nivel: number
  saltar: () => string
}

interface Sonic {
  compañia: "SEGA"
  tipo: string
  anillos: number
  correr: () => string
}

type Personaje = Mario | Sonic;

// Se pone persona is Mario para indicar que esta función
// es un Type Guard que verifica si el personaje es de 
// tipo Mario.
function esMario(personaje: Personaje): personaje is Mario {
  return personaje.compañia === "Nintendo";
} 

// Esto permite usar la función para refinar el tipo
// de manera segura en tiempo de ejecución.
// Ya que según el tipo de dato tendrá unas propiedades u otras.
function jugar(persona: Personaje) {
  if (esMario(persona)) {
    console.log(`Es Mario, nivel: ${persona.nivel}, acción: ${persona.saltar()}`);
  } else {
    console.log(`Es Sonic, anillos: ${persona.anillos}, acción: ${persona.correr()}`);
  }
}

const mario: Mario = {
  compañia: "Nintendo",
  tipo: "Plataformas",
  nivel: 5,
  saltar: () => "¡Mario salta!"
};
const sonic: Sonic = {
  compañia: "SEGA",
  tipo: "Carreras",
  anillos: 10,
  correr: () => "¡Sonic corre rápido!"
};
jugar(mario);
jugar(sonic);


// Propiedades privadas, protegidas y públicas
class Animal {
  public nombre: string;
  protected edad: number;
  private especie: string;
  constructor(nombre: string, edad: number, especie: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.especie = especie;
  }
  public describir(): string {
    return `Este es ${this.nombre}, un ${this.especie} de ${this.edad} años.`;
  }
}

class Perro extends Animal {
  private raza: string;
  constructor(nombre: string, edad: number, especie: string, raza: string) {
    super(nombre, edad, especie);
    this.raza = raza;
  }
  public ladrar(): string {
    return `${this.nombre} dice: ¡Guau!`;
  }
}
const miPerro = new Perro("Firulais", 3, "Canino", "Labrador");
console.log(miPerro.describir());
console.log(miPerro.ladrar());
// console.log(miPerro.especie); // Error: propiedad privada
// console.log(miPerro.edad);    // Error: propiedad protegida

// Interface en clases
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
const miPajaro = new Pajaro("Águila");
console.log(miPajaro.volar());