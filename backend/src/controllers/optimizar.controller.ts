import { Request, Response } from 'express';
import { optimizarSchema } from '../schemas/optimizar.schema';
import { knapsack } from '../services/knapsack.service';
import OptimizationRun from '../models/OptimizationRun.model';

export async function optimizar(req: Request, res: Response) {
  const parsed = optimizarSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { capacidad, objetos } = parsed.data;
  const result = knapsack(capacidad, objetos);

  // Persistencia (no obligatoria para el examen, pero útil)
  try {
    await OptimizationRun.create({ input: { capacidad, objetos }, result });
  } catch (e) {
    // log, pero no rompas la respuesta
    console.error('[save run error]', e);
  }

  return res.json(result);
}

export async function listRuns(req: Request, res: Response) {
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    OptimizationRun.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    OptimizationRun.countDocuments()
  ]);

  res.json({ items, total, page, limit });
}
