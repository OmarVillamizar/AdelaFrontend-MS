import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { dateFromStringToMsUTC } from '../dateUtils'

const API_URL = import.meta.env.VITE_BACKEND_URL

const [getToken, setToken, removeToken] = useLocalStorage('authToken')

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/ms-auth/user/info`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data;  // ← AGREGAR ESTA LÍNEA
  } catch (error) {
    throw error.response?.data || error.message;  // ← MEJORAR MANEJO
  }
}
 

export const updateUserInfo = async (user) => {
  try {
    user.fechaNacimiento = dateFromStringToMsUTC(user.fechaNacimiento)

    const endpoint =
      user.tipoUsuario === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'

    const response = await axios.put(`${API_URL}/ms-auth/${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    
    // ← AGREGAR ESTO - Crear objeto con estructura esperada
    const responseOut = {
      ok: response.status === 200,
      data: response.data,
      status: response.status,
    }
    return responseOut;  // ← DEVOLVER EL OBJETO COMPLETO
  } catch (error) {
    throw error.response?.data || error.message;
  }
}


