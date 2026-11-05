import { API_URL } from "./config";

export const apiRequest = async (path, options = {}) => {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, options);
    } catch {
        throw new Error("No se pudo conectar con el servidor.");
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "La solicitud no pudo completarse.");
    }

    return data;
};