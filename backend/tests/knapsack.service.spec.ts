import { describe, it, expect } from '@jest/globals';
import { knapsack } from '../src/services/knapsack.service';

describe('knapsack service', () => {
  it('Caso de Éxito 1 (PDF)', () => {
    const capacidad = 10000;
    const objetos = [
      { nombre: 'Fondo_A', peso: 2000, ganancia: 1500 },
      { nombre: 'Fondo_B', peso: 4000, ganancia: 3500 },
      { nombre: 'Fondo_C', peso: 5000, ganancia: 4000 },
      { nombre: 'Fondo_D', peso: 3000, ganancia: 2500 },
      { nombre: 'Fondo_E', peso: 1500, ganancia: 1800 }
    ];
    const res = knapsack(capacidad, objetos);
    expect(res.ganancia_total).toBe(9300);
    expect(res.peso_total).toBe(10000);
    // Opción A (con Sets, si ya tienes tipos de Jest OK):
    // expect(new Set(res.seleccionados)).toEqual(new Set(['Fondo_B', 'Fondo_C', 'Fondo_E']));
    // Opción B (sin Sets, 100% compatible):
    expect([...res.seleccionados].sort()).toEqual(['Fondo_B', 'Fondo_C', 'Fondo_E'].sort());
  });

  it('Capacidad 0', () => {
    const res = knapsack(0, [{ nombre: 'A', peso: 1, ganancia: 100 }]);
    expect(res.ganancia_total).toBe(0);
    expect(res.peso_total).toBe(0);
    expect(res.seleccionados).toEqual([]);
  });

  it('Pesos y ganancias en 0', () => {
    const res = knapsack(5, [
      { nombre: 'A', peso: 0, ganancia: 0 },
      { nombre: 'B', peso: 0, ganancia: 0 }
    ]);
    expect(res.ganancia_total).toBe(0);
  });
});
