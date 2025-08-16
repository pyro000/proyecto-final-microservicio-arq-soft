import type { Item } from '../schemas/optimizar.schema';

export function knapsack(capacidad: number, objetos: Item[]) {
  const n = objetos.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacidad + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { peso, ganancia } = objetos[i - 1];
    for (let w = 0; w <= capacidad; w++) {
      dp[i][w] = dp[i - 1][w];
      if (peso <= w) dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - peso] + ganancia);
    }
  }

  // reconstrucción
  let w = capacidad;
  const seleccionados: string[] = [];
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      seleccionados.push(objetos[i - 1].nombre);
      w -= objetos[i - 1].peso;
    }
  }
  seleccionados.reverse();

  const peso_total = objetos
    .filter(o => seleccionados.includes(o.nombre))
    .reduce((s, o) => s + o.peso, 0);

  const ganancia_total = dp[n][capacidad];

  return { seleccionados, ganancia_total, peso_total };
}