import { JobModel } from '../models/job.js';
export class JobsController {
  static async getAll(req, res) {
    // Despues del ':' están los valores por defecto
    const { text, title, level, offset = 0, limit = 10, technology } = req.query;
    const paginatedJobs = await JobModel.getAll({ text, title, level, offset, limit, technology });
    return res.status(200).json(
      {
        data:paginatedJobs,
        total: paginatedJobs.length,
        meta:{
          offset: Number(offset), 
          limit: Number(limit)
        }
      }
    );
  }
  static async getById(req, res) {
  const { id } = req.params;
  const job = await JobModel.getById(id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  return res.json(job);
}
  static async create(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data } = req.body;
    res.status(201).json(await JobModel.create(titulo, empresa, ubicacion, descripcion, data));
  }
  static async update(req, res) {
    const { id } = req.params;
    const { titulo, empresa, ubicacion, descripcion, data } = req.body;
    const updatedJob = await JobModel.update(id, titulo, empresa, ubicacion, descripcion, data);
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated', job: updatedJob });
  }
  static async delete(req, res) {
    const { id } = req.params;
    const deleted = await JobModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted' });
  }
}