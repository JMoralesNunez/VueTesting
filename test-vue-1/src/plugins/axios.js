import axios from 'axios';

const API_BASE_URL = 'https://parkingcrud2-0.onrender.com/api'; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error('No autorizado. Posiblemente necesite iniciar sesión de nuevo.');
        } else if (error.response && error.response.status === 404) {
            console.error('Recurso no encontrado.', error.response.data);
        } else {
            console.error('Error en la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;