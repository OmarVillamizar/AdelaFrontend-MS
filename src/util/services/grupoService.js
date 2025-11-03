import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

// ✅ Solo usar el Gateway
const API_URL = import.meta.env.VITE_BACKEND_URL  // http://localhost:8060

const [getToken] = useLocalStorage('authToken')

// Obtener información de los grupos (👉 Gateway → ms-grupos)
export const getGroups = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/api/grupos`, {  // ✅ Cambiar aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Obtener información de los profesores (👉 Gateway → ms-auth)
export const getProfesores = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/ms-auth/profesores`, {  // ✅ Ya está correcto
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Obtener información de los estudiantes (👉 Gateway → ms-auth)
export const getEstudiantes = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/ms-auth/estudiantes`, {  // ✅ Ya está correcto
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Crear grupo (👉 Gateway → ms-grupos)
export const createGrupo = async (grupoDTO) => {
  try {
    const token = getToken()
    const response = await axios.post(`${API_URL}/api/grupos`, grupoDTO, {  // ✅ Cambiar aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || 'Error inesperado al crear el grupo'
  }
}

// Añadir estudiantes a un grupo (👉 Gateway → ms-grupos)
export const addStudentsToGroup = async (grupoId, estudiantes) => {
  try {
    const token = getToken()
    const response = await axios.post(
      `${API_URL}/api/grupos/${grupoId}/estudiantes`,  // ✅ Cambiar aquí
      estudiantes,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Eliminar un estudiante de un grupo (👉 Gateway → ms-grupos)
export const deleteStudentFromGroup = async (grupoId, estudianteEmail) => {
  try {
    const token = getToken()
    const response = await axios.delete(
      `${API_URL}/api/grupos/${grupoId}/estudiantes/${estudianteEmail}`,  // ✅ Cambiar aquí
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Obtener un grupo por ID (👉 Gateway → ms-grupos)
export const getGroupById = async (grupoId) => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/api/grupos/${grupoId}`, {  // ✅ Cambiar aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Eliminar grupo (👉 Gateway → ms-grupos)
export const deleteGrupo = async (grupoId) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${API_URL}/api/grupos/${grupoId}`, {  // ✅ Cambiar aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}