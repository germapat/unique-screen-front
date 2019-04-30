import Vue from 'vue'
import { Loading, date } from 'quasar'
import axios from 'axios'

let call

export function getDocumentoCliende ({ dispatch, commit }, data) {
  dispatch('vaciarInformacionCliente')
  dispatch('loadingAction')
  let dataUrl = ''
  if (data.tipoDocumento === 'codigo_familiar') {
    dataUrl = `${data.tipoDocumento}/${data.documento.replace(/^\s+|\s+$/g, '')}/identification/${data.identification.replace(/^\s+|\s+$/g, '')}`
  } else {
    dataUrl = `${data.tipoDocumento}/${data.documento.replace(/^\s+|\s+$/g, '')}/`
  }
  if (call) {
    call.cancel('Se inició nueva búsqueda')
  }
  call = axios.CancelToken.source()
  Vue.prototype.$axios
    .get(dataUrl, {
      cancelToken: call.token
    })
    .then(response => {
      if (response.data.codigos_familiares.length > 1) {
        commit('cliente/setOpenModal', true, { root: true })
        commit('cliente/setCodigosFamiliares', response.data.codigos_familiares, { root: true })
      } else {
        const identification = response.data.informacion_cliene.identificacion_cliente
        const codigoFamiliar = response.data.informacion_cliene.codigo_familiar
        const contratos = response.data.informacion_cliene.contratos
        commit('cliente/setOpenModal', false, { root: true })
        commit('cliente/setInformacionCliente', response.data.informacion_cliene, { root: true })
        commit('cliente/setPortafolio', response.data.portafolio, { root: true })

        dispatch('mensajePersonalizdoAction', codigoFamiliar)
        dispatch('detallePeticionesAction', contratos)
        dispatch('detalleDaniosCerradosAction', identification)
        dispatch('detalleDaniosAbiertosAction', codigoFamiliar)
        dispatch('guionTratamientoAction', codigoFamiliar)
        commit('cliente/setInfoClienteLoading', false, { root: true })
        commit('cliente/setPortafolioLoading', false, { root: true })
      }
    })
    .catch(authError => {
      dispatch('loadingHideAction')
    })
    .finally(() => {
      Loading.hide()
    })
}

export function mensajePersonalizdoAction ({ commit }, codigoFamiliar) {
  // Mensaje personalizado
  Vue.prototype.$axios
    .get(`mensaje_personalizdo/codigo_familiar/${codigoFamiliar}/`, {
      cancelToken: call.token
    })
    .then(responseMensajePersonalizado => {
      commit('cliente/setMensajePersonalizdo', responseMensajePersonalizado.data.mensaje_personalizdo, { root: true })
    })
    .catch(authError => {
    })
    .finally(() => {
    })
}

export function detallePeticionesAction ({ commit }, contratos) {
  // Detalle Peticiones
  Vue.prototype.$axios
    .post(`detalle_peticiones/`, contratos, {
      cancelToken: call.token
    })
    .then(responsePeticiones => {
      let detallePeticiones = responsePeticiones.data.detalle_peticiones
      // Ordena la fecha de peticion de forma desendente
      detallePeticiones = detallePeticiones.sort(function (a, b) {
        const aDay = a.FECHA_PETICION.split('/')[0]
        const aMonth = a.FECHA_PETICION.split('/')[1]
        const aYear = a.FECHA_PETICION.split('/')[2]
        const bDay = b.FECHA_PETICION.split('/')[0]
        const bMonth = b.FECHA_PETICION.split('/')[1]
        const bYear = b.FECHA_PETICION.split('/')[2]
        let a1 = date.buildDate({ year: aYear, date: aDay, month: aMonth })
        let b1 = date.buildDate({ year: bYear, date: bDay, month: bMonth })
        return a1 > b1 ? -1 : a1 < b1 ? 1 : 0
      })
      commit('cliente/setDetallePeticiones', detallePeticiones, { root: true })
    })
    .catch(authError => {
    })
    .finally(() => {
      commit('cliente/setPeticionesLoading', false, { root: true })
    })
}

export function detalleDaniosCerradosAction ({ commit, state }, identification) {
  // Detalle danios cerrados
  Vue.prototype.$axios
    .get(`detalle_danios_cerrados/identification/${identification}/`, {
      cancelToken: call.token
    })
    .then(responseDaniosCerrados => {
      let detalleDaniosCerrados = responseDaniosCerrados.data.detalle_danios_cerrados.filter((x) => {
        if (x.DIRECCION === state.informacionClienteState.direccion) {
          return true
        }
      })
      commit('cliente/setDetalleDaniosCerrados', detalleDaniosCerrados, { root: true })
    })
    .catch(authError => {
    })
    .finally(() => {
      commit('cliente/setCerradoLoading', false, { root: true })
    })
}

export function detalleDaniosAbiertosAction ({ commit }, codigoFamiliar) {
  // Detalle danios abiertos
  Vue.prototype.$axios
    .get(`detalle_danios_abiertos/codigo_familiar/${codigoFamiliar}/`, {
      cancelToken: call.token
    })
    .then(responseDaniosAbiertos => {
      commit('cliente/setDetalleDaniosAbiertos', responseDaniosAbiertos.data.detalle_danios_abiertos, { root: true })
      commit('cliente/setInfoGuionTratamientoCCCSoap', responseDaniosAbiertos.data.info_guion_tratamiento_ccc, { root: true })
    })
    .catch(authError => {
    })
    .finally(() => {
      commit('cliente/setAbiertoLoading', false, { root: true })
    })
}

export function guionTratamientoAction ({ commit }, codigoFamiliar) {
  // Guion tratameinto
  Vue.prototype.$axios
    .get(`guion_tratamiento/${codigoFamiliar}/`, {
      cancelToken: call.token
    })
    .then(responseGuion => {
      commit('cliente/setInfoGuionTratamientoCCCRest', responseGuion.data, { root: true })
    })
    .catch(authError => {
    })
    .finally(() => {
      commit('cliente/setGuionLoading', false, { root: true })
    })
}

export function identificacionBuscarAction ({ commit }, identificacionBuscar) {
  commit('cliente/setIdentificacionBuscar', identificacionBuscar, { root: true })
}

export function vaciarInformacionCliente ({ commit }) {
  commit('cliente/setOpenModal', false, { root: true })
  commit('cliente/setCodigosFamiliares', [], { root: true })
  commit('cliente/setInformacionCliente', {}, { root: true })
  commit('cliente/setPortafolio', [], { root: true })
  commit('cliente/setDetalleDaniosAbiertos', [], { root: true })
  commit('cliente/setDetalleDaniosCerrados', [], { root: true })
  commit('cliente/setDetallePeticiones', [], { root: true })
  commit('cliente/setInfoGuionTratamientoCCCSoap', [], { root: true })
  commit('cliente/setInfoGuionTratamientoCCCRest', [], { root: true })
  commit('cliente/setMensajePersonalizdo', '', { root: true })
  commit('style/setColorTratemiento', 'blue-emtelco-d', { root: true })
}

export function loadingAction ({ commit }) {
  Loading.show()
  commit('cliente/setGuionLoading', true, { root: true })
  commit('cliente/setInfoClienteLoading', true, { root: true })
  commit('cliente/setPortafolioLoading', true, { root: true })
  commit('cliente/setAbiertoLoading', true, { root: true })
  commit('cliente/setCerradoLoading', true, { root: true })
  commit('cliente/setPeticionesLoading', true, { root: true })
}

export function loadingHideAction ({ commit }) {
  Loading.hide()
  commit('cliente/setGuionLoading', false, { root: true })
  commit('cliente/setInfoClienteLoading', false, { root: true })
  commit('cliente/setPortafolioLoading', false, { root: true })
  commit('cliente/setAbiertoLoading', false, { root: true })
  commit('cliente/setCerradoLoading', false, { root: true })
  commit('cliente/setPeticionesLoading', false, { root: true })
}

export async function conenctarSocket ({ dispatch, commit }) {
  // Escucha por mensajes
  new WebSocket(process.env.API_SOCKET)
    .addEventListener('message', async function (event) {
      if (event.data === '') {
        const response = {
          'primary_ani': '',
          'ucid': '',
          'vdu_id': ''
        }
        await commit('cliente/setInformacionLlamada', response, { root: true })
      } else {
        const dataSocketJson = JSON.parse(event.data)
        const isInbound = dataSocketJson.find(a => {
          if (a.value === 'inbound') {
            return true
          }
        })
        if (isInbound !== undefined) {
          Notification.requestPermission()
          var options = {
            body: 'Pantalla Unica',
            icon: '../statics/quasar-logo.png'
          }
          const notif = new Notification('Pantalla Unica', options)
          setTimeout(notif.close(), 1000)
          let response = {}
          dataSocketJson.forEach(element => {
            if (element.status && (element.name === 'primary_ani' || element.name === 'ucid' || element.name === 'vdu_id')) {
              response[element.name] = element.value
            }
          })
          // Limpia la informacion de la llamada (cada vez que entre una llamada. el socker envia datos)
          await dispatch('vaciarInformacionCliente')
          commit('cliente/setIdentificacionBuscar', '', { root: true })
          // LLena la informacion de la llamada
          await commit('cliente/setInformacionLlamada', response, { root: true })
          await dispatch('getDocumentoCliende', {'tipoDocumento': 'vdu_id', 'documento': response.vdu_id})
        }
      }
    })
}

/*
export async function getDocumentocliende ({ commit }) {
  const response = await axios.get('assets/cliente.json')
  commit('cliente/setCliente', response.data, { root: true })
}
*/
