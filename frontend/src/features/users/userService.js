import axios from "axios";

// Corregido: falta la barra después del puerto
const API_URL = "http://localhost:5000/api/user";

// Función para actualizar el perfil
const updateProfile = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}/me`, userData, config);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Actualiza el localStorage
    }

    return response.data;
};

// Exporta la función
const authService = {
    updateProfile,
};

export default authService;
