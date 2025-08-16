import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
});

export type Run = {
  _id: string;
  createdAt: string;
  input: { capacidad: number; objetos: { nombre: string; peso: number; ganancia: number }[] };
  result: { seleccionados: string[]; ganancia_total: number; peso_total: number };
};

export async function fetchRuns(limit = 10, page = 1) {
  const { data } = await api.get<{ items: Run[]; total: number; page: number; limit: number }>(`/runs`, {
    params: { limit, page },
  });
  return data;
}


export default api;