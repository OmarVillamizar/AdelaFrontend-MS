import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

const API_URL = import.meta.env.VITE_BACKEND_URL             // 👉 ms-auth
const API_URL_GRUPOS = import.meta.env.VITE_BACKEND_GRUPOS // 👉 ms-grupos

const [getToken] = useLocalStorage('authToken')

// Obtener información de los grupos (ms-grupos)
export const getGroups = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL_GRUPOS}/api/grupos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Consultar Estudiante por Correo
export const consultarPorCorreo = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/estudiantes/${email}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Obtener información de los profesores (ms-auth)
export const getProfesores = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/api/profesores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Obtener información de los estudiantes (ms-auth)
export const getEstudiantes = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/api/estudiantes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Crear grupo (👉 debe ir a ms-grupos)
export const createGrupo = async (grupoDTO) => {
  try {
    const token = getToken()
    const response = await axios.post(`${API_URL_GRUPOS}/api/grupos`, grupoDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || 'Error inesperado al crear el grupo'
  }
}

// Añadir estudiantes a un grupo (👉 ms-grupos)
export const addStudentsToGroup = async (grupoId, estudiantes) => {
  try {
    const token = getToken()
    const response = await axios.post(
      `${API_URL_GRUPOS}/api/grupos/${grupoId}/estudiantes`,
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

// Eliminar un estudiante de un grupo (👉 ms-grupos)
export const deleteStudentFromGroup = async (grupoId, estudianteEmail) => {
  try {
    const token = getToken()
    const response = await axios.delete(
      `${API_URL_GRUPOS}/api/grupos/${grupoId}/estudiantes/${estudianteEmail}`,
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

// Obtener un grupo por ID (👉 ms-grupos)
export const getGroupById = async (grupoId) => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL_GRUPOS}/api/grupos/${grupoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Eliminar grupo (👉 ms-grupos)
export const deleteGrupo = async (grupoId) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${API_URL_GRUPOS}/api/grupos/${grupoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}