import router from '../router'
import { Notify } from 'quasar'

const libs = {
  // Está autenticado ?
  isAuthenticated () {
    return localStorage.getItem('token') !== null || false
  },
  // Obtener token
  getToken () {
    return localStorage.getItem('token')
  },
  // Obtener información del usuario en un objeto JSON
  getInfo () {
    return {
      document: localStorage.getItem('document'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
      is_superuser: localStorage.getItem('is_superuser'),
      position: localStorage.getItem('position')
    }
  },
  getDocument () {
    let document = localStorage.getItem('document')
    return document
  },
  // Obtener el nombre completo
  getFullName () {
    let fullName = null
    if (localStorage.getItem('first_name') !== null && localStorage.getItem('last_name') !== null) {
      fullName = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')
    }
    return fullName
  },
  getPilots () {
    var pilots = JSON.parse(localStorage.pilots)
    let i = 0
    pilots = pilots.map(obj => {
      return {
        indicators_link: obj.indicators_link,
        label: obj.name,
        value: obj.id,
        position: i++
      }
    })
    return pilots
  },
  getAvatar (base) {
    let avatarHelp = localStorage.avatar
    let urlHelp = base
    return urlHelp + avatarHelp
  },
  getUserName () {
    let username = null
    if (localStorage.getItem('username') !== null) {
      username = localStorage.getItem('username')
    }
    return username
  },
  // Obtener el nombre completo con usuario
  getFullNameWithUsername () {
    let fullNameWithUsername = libs.getFullName()
    if (fullNameWithUsername) {
      fullNameWithUsername += ' (' + localStorage.getItem('username') + ')'
    }
    return fullNameWithUsername
  },
  // Validar lista de permisos
  hasPermission (permissionList) {
    let permissionsLocalStorage = JSON.parse(localStorage.getItem('permissions'))
    let isSuperUser = (localStorage.getItem('is_superuser') === 'true')
    let havePermission = true
    permissionList.forEach(element => {
      if (permissionsLocalStorage.indexOf(element) < 0) {
        havePermission = false
      }
    })
    return (isSuperUser || havePermission)
  },
  // Cerrar sesión
  logOut () {
    localStorage.clear()
    router.push({path: '/'})
  },
  // Crear notificación
  createNotify (config) {
    Notify.create(config)
  },
  // Tiempo
  time: {
    getSecondsFromMinutes (minutes) {
      return minutes * 60
    },
    getSecondsFromHours (hours) {
      return hours * 60 * 60
    },
    getMinutesFromSeconds (seconds) {
      return seconds / 60
    },
    getHoursFromSeconds (seconds) {
      return seconds / 60 / 60
    }
  },
  colorPaginacionNext (pagina, numeroPaginas) {
    if (pagina < numeroPaginas) {
      return 'blue-une-l'
    } else {
      return 'grey'
    }
  },
  colorPaginacionPrevious (pagina) {
    if (pagina > 1) {
      return 'blue-une-l'
    } else {
      return 'grey'
    }
  }
}

// Exportar libs como instancia de Vue
export default ({ Vue }) => {
  Vue.prototype.$libs = libs
}

// Exportar libs como módulo de JS
export { libs }
