import { useEffect, useState } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
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
  CButton,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilCopy, cilHeart, cilBank, cilCreditCard, cilMoney, cilStar } from '@coreui/icons'
import Swal from 'sweetalert2'

const Donaciones = () => {
  const [copiedAccount, setCopiedAccount] = useState(null)

  const copyToClipboard = async (text, accountType) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountType)
      setTimeout(() => setCopiedAccount(null), 2000)
      
      Swal.fire({
        icon: 'success',
        title: '¡Copiado!',
        text: `Número de cuenta copiado al portapapeles`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo copiar al portapapeles',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  const accounts = [
    {
      bank: 'Bancolombia',
      accountNumber: '832-311919-52',
      accountType: 'Ahorros',
      owner: 'Omar Villamizar',
      icon: cilBank,
      color: 'primary'
    },
    {
      bank: 'Nequi',
      accountNumber: '3209241023',
      accountType: 'Celular',
      owner: 'Omar Villamizar',
      icon: cilMoney,
      color: 'success'
    },
    {
      bank: 'Paypal',
      accountNumber: 'https://paypal.me/omarvilla22',
      accountType: 'Cuenta',
      owner: 'Omar Villamizar',
      icon: cilCreditCard,
      color: 'info'
    }
  ]

  const purposes = [
    {
      title: 'Cuota del Servidor',
      description: 'Sevidor de despliegue, base de datos'
    },
    {
      title: 'Obtención de Dominio',
      description: 'Adquirir un dominio propio acorde a la tematica del aplicativo',

    },
    {
      title: 'Mantenimiento de la Página',
      description: 'Actualizaciones, mejoras de seguridad y optimización del sitio web',
    },
    {
      title: 'Crecimiento del Proyecto',
      description: 'Desarrollo de nuevas funcionalidades y expansión de la plataforma',
    }
  ]

  return (
    <CContainer fluid className="p-1">
      <CRow className="justify-content-center">
        <CCol xs={12}>
          {/* Header */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-bottom-0 text-center py-4">
              <CIcon icon={cilHeart} size="xl" className="text-danger mb-3" />
              <h2 className="mb-2 text-dark">Apoya a ADELA</h2>
              <p className="text-muted mb-0">
                Tu contribución nos ayuda a mantener y mejorar este proyecto para toda la comunidad
              </p>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="justify-content-center">
        {/* Cuentas Bancarias */}
        <CCol lg={8} md={10} xs={12}>
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-white border-bottom">
              <h4 className="mb-0 text-dark">
                <CIcon icon={cilStar} className="me-2 text-primary" />
                Cuentas para Donaciones
              </h4>
            </CCardHeader>
            <CCardBody className="p-0">
              {accounts.map((account, index) => (
                <div key={index} className={`p-4 ${index !== accounts.length - 1 ? 'border-bottom' : ''}`}>
                  <CRow className="align-items-center">
                    <CCol sm={1} xs={2} className="text-center">
                      <CIcon 
                        icon={account.icon} 
                        size="xl" 
                        className={`text-${account.color}`} 
                      />
                    </CCol>
                    <CCol sm={7} xs={10}>
                      <h5 className="mb-1 text-dark">{account.bank}</h5>
                      <p className="mb-1 text-muted small">{account.accountType}</p>
                      <p className="mb-0 text-muted small">{account.owner}</p>
                    </CCol>
                    <CCol sm={3} xs={8} className="text-sm-end">
                      <div className="d-flex align-items-center justify-content-sm-end">
                        {account.bank === 'Paypal' ? (
                          // Para PayPal: botón clickeable que redirige
                          <CButton
                            color="light"
                            size="sm"
                            href={account.accountNumber}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2"
                          >
                            <CIcon icon={cilCreditCard} size="sm" className="me-1" />
                            Ir a PayPal
                          </CButton>
                        ) : (
                          // Para otras cuentas: copiable como antes
                          <>
                            <code className="bg-light px-2 py-1 rounded me-2 small">
                              {account.accountNumber}
                            </code>
                            <CButton
                              color="outline-secondary"
                              size="sm"
                              onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                              className="border-0"
                            >
                              <CIcon 
                                icon={cilCopy} 
                                size="sm"
                                className={copiedAccount === account.bank ? 'text-success' : ''} 
                              />
                            </CButton>
                          </>
                        )}
                      </div>
                    </CCol>
                  </CRow>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="justify-content-center">
        {/* Uso de las Donaciones */}
        <CCol lg={8} md={10} xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-white border-bottom">
              <h4 className="mb-0 text-dark">
                <CIcon icon={cilCloudDownload} className="me-2 text-success" />
                ¿Cómo se utilizan las donaciones?
              </h4>
            </CCardHeader>
            <CCardBody>
              <p className="text-muted mb-4">
                Cada donación se destinara a diferentes gastos relacionados con el funcionamiento o mejorás del proyecto, explicadas a continuación:
              </p>
              
              <CRow>
                {purposes.map((purpose, index) => (
                  <CCol lg={6} md={6} sm={12} key={index} className="mb-4">
                    <div className="h-100 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="text-dark mb-0">{purpose.title}</h6>
                        <span className="badge bg-primary">{purpose.percentage}</span>
                      </div>
                      <p className="text-muted small mb-0">{purpose.description}</p>
                    </div>
                  </CCol>
                ))}
              </CRow>
              
              <CAlert color="info" className="mt-4 border-0 bg-light">
                <div className="d-flex align-items-center">
                  <CIcon icon={cilHeart} className="me-2 text-info" />
                  <div>
                    <strong>Transparencia:</strong> Se publicarán informes sobre el uso 
                    de las donaciones para mantener la transparencia sobre estas aportaciones.
                  </div>
                </div>
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Footer de agradecimiento */}
      <CRow className="justify-content-center mt-4">
        <CCol lg={8} md={10} xs={12} className="text-center">
          <div className="py-4">
            <h5 className="text-dark mb-2">¡Gracias por tu apoyo!</h5>
            <p className="text-muted">
              Cada contribución, sin importar su tamaño, hace la diferencia y nos ayuda 
              a mantener este proyecto funcionando para toda la comunidad.
            </p>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Donaciones