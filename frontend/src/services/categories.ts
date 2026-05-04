  // src/services/categories.ts (JWT)
  import { request } from './http';
  export const listCategories = () => request('/categories', { auth: true });
  export const getCategory = (id: number) => request(`/categories/${id}`, { auth: true });