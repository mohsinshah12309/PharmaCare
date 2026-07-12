import api from "./api";
export const getAllProducts = async (params = {}) => {
  return (await api.get("/products", { params })).data;
};
export const getProductsByCategory = async (slug, params = {}) => {
  return (await api.get("/products", { params: { ...params, category: slug } }))
    .data;
};
export const getProductById = async (id) => {
  return (await api.get(`/products/${id}`)).data;
};
export const searchProducts = async (term, params = {}) => {
  return (await api.get("/products", { params: { ...params, search: term } }))
    .data;
};
export const getCategories = async () => {
  return (await api.get("/products/categories")).data;
};