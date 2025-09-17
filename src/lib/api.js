import axios from "axios";

// Configuración base del cliente API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests - agregar tokens de autenticación si es necesario
api.interceptors.request.use(
  (config) => {
    // Aquí podrías agregar tokens de autenticación
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    /* console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    ); */
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo global de errores
api.interceptors.response.use(
  (response) => {
    // console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const { response, request, message } = error;

    if (response) {
      // El servidor respondió con un error
      console.error(`❌ API Error ${response.status}:`, response.data);

      // Manejo específico de errores
      switch (response.status) {
        case 401:
          // Token expirado o no válido
          console.warn("🔒 Token expirado, redirigiendo al login...");
          // Aquí podrías limpiar el token y redirigir
          break;
        case 403:
          console.warn("🚫 Acceso denegado");
          break;
        case 404:
          console.warn("🔍 Recurso no encontrado");
          break;
        case 500:
          console.error("💥 Error interno del servidor");
          break;
        default:
          console.error("❓ Error desconocido:", response.status);
      }
    } else if (request) {
      // La request se hizo pero no hubo respuesta
      console.error("🌐 Error de conexión:", message);
    } else {
      // Error al configurar la request
      console.error("⚙️ Error de configuración:", message);
    }

    return Promise.reject(error);
  }
);

export default api;
