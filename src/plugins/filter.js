import Vue from 'vue'
// import moment from 'moment'
import { date } from 'quasar'

export default Vue.filter('formatDate', function (value) {
  if (value) {
    if (value.length === 10) {
      return value
    } else {
      return date.formatDate(String(value), 'DD/MM/YYYY')
      // return moment(String(value)).format('DD/MM/YYYY HH:MM:SS')
    }
  }
})
Vue.filter('formatDateTime', function (value) {
  if (value) {
    if (value.length === 10) {
      return value
    } else {
      return date.formatDate(String(value), 'DD/MM/YYYY HH:MM:SS')
      // return moment(String(value)).format('DD/MM/YYYY HH:MM:SS')
    }
  }
})
Vue.filter('textLength', function (value) {
  if (value) {
    if (value.length > 20) {
      return value.substring(0, 20) + '...'
    } else {
      return value
    }
  }
})
Vue.filter('tecnologiaFilter', function (value) {
  if (value) {
    if (value === 'Copper') {
      return 'REDCO'
    } else if (value === 'Unknown') {
      return 'N/A'
    } else {
      return value
    }
  }
})
Vue.filter('estadoProducto', function (value) {
  if (value) {
    if (value === 'Active') {
      return 'Activo'
    } else {
      return 'Suspendido'
    }
  }
})
