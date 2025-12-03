import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// ======== GET =========
// Get all products
export const getAllProducts = () => api.get('/products');

// Get single product by ID
export const getProductById = (id) => api.get(`/products/${id}`);

// ======== POST ========
// Create a new product
export const createProduct = (newProduct) =>
  api.post('/products', newProduct);

// ======== PUT =========
// Update existing product
export const updateProduct = (id, updatedProduct) =>
  api.put(`/products/${id}`, updatedProduct);

// ======== DELETE =======
// Delete a product
export const deleteProduct = (id) => api.delete(`/products/${id}`);
