import { z } from 'zod';

export const itemSchema = z.object({
  nombre: z.string().min(1),
  peso: z.number().int().nonnegative(),
  ganancia: z.number().int().nonnegative()
});

export const optimizarSchema = z.object({
  capacidad: z.number().int().nonnegative(),
  objetos: z.array(itemSchema).min(1)
});

export type OptimizarInput = z.infer<typeof optimizarSchema>;
export type Item = z.infer<typeof itemSchema>;