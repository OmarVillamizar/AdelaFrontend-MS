import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CContainer,
  CAlert,
  CButton,
  CSpinner,
} from '@coreui/react'
import { obtenerEstadisticasGrupo, getGroupById } from '../../util/services/grupoService'
import { CChartBar, CChartPie } from '@coreui/react-chartjs'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react'
import { cilChart, cilArrowLeft } from '@coreui/icons'

const EstadisticasGrupo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useOutletContext()

  const [estadisticas, setEstadisticas] = useState(null)
  const [grupo, setGrupo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información del grupo
        const grupoData = await getGroupById(id)
        setGrupo(grupoData)

        // Obtener estadísticas del grupo
        const estadisticasData = await obtenerEstadisticasGrupo(id)
        setEstadisticas(estadisticasData)
        setLoading(false)
      } catch (error) {
        console.error('Error obteniendo estadísticas:', error)
        setError('Hubo un error al obtener las estadísticas del grupo.')
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las estadísticas del grupo.',
        })
      }
    }

    if (id) {
      fetchData()
    } else {
      setError('ID de grupo no proporcionado')
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <CContainer>
        <CAlert color="info" className="text-center">
          <CSpinner color="primary" className="me-2" />
          Cargando estadísticas...
        </CAlert>
      </CContainer>
    )
  }

  if (error || !estadisticas) {
    return (
      <CContainer>
        <CAlert color="danger">
          <p>{error || 'No se encontraron estadísticas para este grupo.'}</p>
          <CButton color="secondary" onClick={() => navigate(`/grupos/${id}`)}>
            Volver
          </CButton>
        </CAlert>
      </CContainer>
    )
  }

  const totalEstudiantes = estadisticas.reduce(
    (sum, stat) => sum + stat.numeroEstudiantes,
    0,
  )

  return (
    <CContainer>
      <CAlert
        color="info"
        className="mb-2 d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: '#d3d3d3',
          border: '#d3d3d3',
          color: 'black',
          padding: '0.5rem',
          margin: '0 0.6rem 0 0.6rem',
        }}
      >
        <span className="fw-semibold text-black">
          Estadísticas del Grupo: {grupo?.nombre || 'Grupo'}
        </span>
        <CButton
          color="secondary"
          onClick={() => navigate(`/grupos/${id}`)}
        >
          <CIcon icon={cilArrowLeft} className="me-2" />
          Volver
        </CButton>
      </CAlert>

      <CRow className="mt-4">
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <h4>Estadísticas por Categoría de Aprendizaje</h4>
              <p className="text-muted mb-0">
                Distribución de estudiantes según su estilo de aprendizaje
              </p>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <h5 className="mb-3">Resumen</h5>
                  <p>
                    <strong>Total de estudiantes:</strong> {totalEstudiantes}
                  </p>
                  <p>
                    <strong>Estudiantes con categoría asignada:</strong>{' '}
                    {estadisticas.reduce(
                      (sum, stat) => sum + stat.numeroEstudiantes,
                      0,
                    )}
                  </p>

                  <h5 className="mt-4 mb-3">Detalle por Categoría</h5>
                  <CTable hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Categoría</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">
                          Número de Estudiantes
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">
                          Porcentaje
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {estadisticas.map((estadistica, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <strong>{estadistica.categoria}</strong>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {estadistica.numeroEstudiantes}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span className="badge bg-primary">
                              {estadistica.porcentaje.toFixed(2)}%
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol md={6}>
                  <h5 className="mb-3">Visualización</h5>
                  <div className="mb-4">
                    <CChartBar
                      data={{
                        labels: estadisticas.map((e) => e.categoria),
                        datasets: [
                          {
                            label: 'Número de Estudiantes',
                            backgroundColor: [
                              '#36A2EB',
                              '#4BC0C0',
                              '#FFCE56',
                              '#FF6384',
                              '#9966FF',
                            ],
                            data: estadisticas.map((e) => e.numeroEstudiantes),
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div>
                    <CChartPie
                      data={{
                        labels: estadisticas.map((e) => e.categoria),
                        datasets: [
                          {
                            backgroundColor: [
                              '#36A2EB',
                              '#4BC0C0',
                              '#FFCE56',
                              '#FF6384',
                              '#9966FF',
                            ],
                            data: estadisticas.map((e) => e.porcentaje),
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const label = context.label || ''
                                const value = context.parsed || 0
                                return `${label}: ${value.toFixed(2)}%`
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default EstadisticasGrupo

