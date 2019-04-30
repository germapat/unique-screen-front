import axios from 'axios'
import { Notify } from 'quasar'

const axiosInstace = axios.create({
  baseURL: process.env.API_URL
})

// Interceptar request para enviar el encabezado de autorización
axiosInstace.interceptors.request.use(config => {
  // Enviar el token si existe en LocalStorage
  let token = localStorage.getItem('token')
  if (token !== null) {
    config['headers']['Authorization'] = 'JWT ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstace.interceptors.response.use(response => {
  return response
}, error => {
  // Preparar alertas de acuerdo a las respuestas de error recibidas
  let notifyConfig = {
    position: 'top',
    type: 'negative',
    timeout: 4000,
    actions: [
      {
        icon: 'cancel'
      }
    ]
  }
  let showNotify = false

  // Si error tiene respuesta
  if (error.response) {
    // Validar errores de formulario non_field_errors
    if (typeof error.response.data.non_field_errors !== 'undefined') {
      let html = ''
      error.response.data.non_field_errors.forEach(element => {
        html += element + '\n'
      })
      notifyConfig['icon'] = 'error'
      notifyConfig['message'] = html
      showNotify = true
      // Validar error 401 (Normalmente el token expiró)
    } else if (error.response.status === 401) {
      notifyConfig['icon'] = 'error'
      if (error.response.data.detail === 'Signature has expired.') {
        notifyConfig['message'] = 'Su sesión expiró.'
        Notify.create(notifyConfig)
        localStorage.clear()
        location.reload()
      } else {
        notifyConfig['message'] = error.response.data.detail
        showNotify = true
      }
      // Validar errores diferentes a los campos de los formularios
    } else if (error.response.status === 503) {
      if (error.response.data.message === 'Party no encontrado') {
        notifyConfig['icon'] = 'subtitles'
        notifyConfig['message'] = 'Documento no encontrado'
      } else {
        notifyConfig['icon'] = 'cloud_off'
        notifyConfig['message'] = 'No se pudo conectar'
      }
      showNotify = true
    } else if (error.response.status === 504) {
      notifyConfig['icon'] = 'subtitles'
      notifyConfig['message'] = 'Intenta de nuevo'
      notifyConfig['type'] = 'info'
      showNotify = true
    } else if (error.response.status !== 400) {
      notifyConfig['icon'] = 'error'
      if (error.response.data.message) {
        notifyConfig['message'] = error.response.data.message
      } else if (error.response.data.detail) {
        notifyConfig['message'] = error.response.data.detail
      }
      showNotify = true
    } else if (error.response.status === 400) {
      if (error.response.data.message === 'No se encontron codigos familiares') {
        notifyConfig['icon'] = 'subtitles'
        notifyConfig['message'] = 'Documento no encontrado'
        showNotify = true
      } else {
        notifyConfig['icon'] = 'error'
        notifyConfig['message'] = error.response.data.message
        showNotify = true
      }
    }
    // Validar si el backend no está respondiendo
  } else if (error.request) {
    notifyConfig['icon'] = 'cloud_off'
    notifyConfig['message'] = 'La aplicación no está respondiendo a las peticiones, por favor intente más tarde.'
    showNotify = true
    // Validar si no estamos haciendo bien las solicitudes
  } else if (error.message) {
    notifyConfig['icon'] = 'subtitles'
    notifyConfig['type'] = 'info'
    notifyConfig['message'] = error.message
    showNotify = true
    // Validar si no estamos haciendo bien las solicitudes
  } else {
    notifyConfig['icon'] = 'cloud_off'
    notifyConfig['message'] = 'La aplicación no está realizando las peticiones correctamente, por favor intente más tarde.'
    showNotify = true
  }
  // Mostrar o nó la notificación
  if (showNotify) {
    Notify.create(notifyConfig)
  }
  // Returnar la promesa
  return Promise.reject(error)
})

export default ({ app, router, Vue }) => {
  Vue.prototype.$axios = axiosInstace
}
