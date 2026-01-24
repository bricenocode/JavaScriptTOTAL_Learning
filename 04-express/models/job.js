import crypto from 'crypto';
// Es necesario indicar el tipo por temas de seguridad, una forma de protegerse contra ataques de inyección de código.
import jobs from '../data/jobs.json' with { type: 'json' };

export class JobModel {
  static async getAll({ text, title, level, offset = 0, limit = 10, technology }) {
  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase();
    console.log('Search Term:', searchTerm);
    filteredJobs = filteredJobs.filter((job) => 
      job.titulo.toLowerCase().includes(searchTerm) ||
      job.descripcion.toLowerCase().includes(searchTerm)
    );
  }



  if (technology) {
      const tech = technology.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => 
      job.data.technology.map(t => t.toLowerCase()).includes(tech)
    );
  }

  if (title) {
    const titleTerm = title.toLowerCase();
    filteredJobs = filteredJobs.filter((job) => 
      job.titulo.toLowerCase().includes(titleTerm)
    );
  }

  if (level) {
    const levelTerm = level.toLowerCase();
    filteredJobs = filteredJobs.filter((job) => 
      job.data.nivel.toLowerCase() === levelTerm
    );
  }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

    return filteredJobs;
  }
  static async getById(id) {
     return jobs.find((job) => job.id === id);
  }
  static async create (titulo, empresa, ubicacion, descripcion, data) {
   const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data
    };
    jobs.push(newJob);
    return newJob;
  }
  static async update(id, titulo, empresa, ubicacion, descripcion, data) {
    const jobIndex = getById(id);
    if (jobIndex === -1) {
      return {}; // Job not found
    }
    // Esto lo que hace es crear un nuevo objeto con los datos actualizados
    // el ...jobs[jobIndex] copia los datos que ya existen
    // y luego los campos que vienen después los sobreescribe con los nuevos valores
    const updatedJob = { ...jobs[jobIndex], titulo, empresa, ubicacion, descripcion, data };
    jobs[jobIndex] = updatedJob;
    return updatedJob;
  }
  static async delete(id) {
    const jobIndex = await getById(id);
    if (jobIndex === -1) {
      return false; // Job not found
    }
    // Esto lo que hace es eliminar el trabajo del array
    // splice modifica el array original
    // El primer parámetro es el índice donde empezar a eliminar
    // El segundo parámetro es el número de elementos a eliminar
    jobs.splice(jobIndex, 1);
    return true;
  }
}