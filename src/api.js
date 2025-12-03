
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const getAllProducts = () => api.get('/products');

export const getProductByid = (id) => api.get('/products/${id}');

export const createProduct = (newProduct) =>
    api.post('/products', newProduct);

export const updateProduct = (id, updatedProduct) =>
  api.put(`/products/${id}`, updatedProduct);

export const deleteProduct = (id) => api.delete('/products/$(id}');