import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('POST /optimizar', () => {
  it('valida entrada inválida', async () => {
    const res = await request(app).post('/optimizar').send({});
    expect(res.status).toBe(400);
  });

  it('responde con solución óptima', async () => {
    const res = await request(app).post('/optimizar').send({
      capacidad: 8000,
      objetos: [
        { nombre: 'Acción_Y', peso: 2500, ganancia: 2200 },
        { nombre: 'Acción_Z', peso: 3000, ganancia: 2800 },
        { nombre: 'Bono_Q', peso: 1500, ganancia: 1200 },
        { nombre: 'Bono_P', peso: 4000, ganancia: 3000 }
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body.ganancia_total).toBe(6200);
    // si comparas seleccionados:
    // expect([...res.body.seleccionados].sort()).toEqual(['Acción_Y', 'Acción_Z', 'Bono_Q'].sort());
  });
});
