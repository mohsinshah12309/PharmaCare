import api from './api'
export const getAdminProducts = async (params = {}) => {
  return (await api.get('/admin/products', { params })).data
}
export const createProduct = async (formData) => {
  return (await api.post('/admin/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data
}
export const updateProduct = async (id, formData) => {
  return (await api.put(`/admin/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data
}
export const deleteProduct = async (id) => {
  return (await api.delete(`/admin/products/${id}`)).data
}
export const toggleProductStock = async (id) => {
  return (await api.patch(`/admin/products/${id}/stock`)).data
}
export const getAdminCategories = async () => {
  return (await api.get('/admin/categories')).data
}
export const createCategory = async (data) => {
  return (await api.post('/admin/categories', data)).data
}
export const deleteCategory = async (id) => {
  return (await api.delete(`/admin/categories/${id}`)).data
}