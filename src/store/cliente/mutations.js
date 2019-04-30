/*
export function someMutation (state) {
}
*/
import { date } from 'quasar'

export function setInformacionCliente (state, data) {
  state.informacionClienteState = data
}

export function setPortafolio (state, data) {
  state.portafolioState = data
}

export function setDetalleDaniosAbiertos (state, data) {
  state.detalleDaniosAbiertosState = data
  state.detalleDaniosCerradosState.forEach((detalleDanioCerrado, i) => {
    state.detalleDaniosAbiertosState.forEach((detalleDanioAbierto, j) => {
      if (detalleDanioCerrado.ID_DANIO === detalleDanioAbierto.incidente) {
        state.detalleDaniosAbiertosState[j]['GRUPO'] = detalleDanioCerrado.GRUPO
      }
    })
  })
  state.detalleDaniosAbiertosState = state.detalleDaniosAbiertosState.sort(function (a, b) {
    const aFechaAperturaSplit = a.fecha_apertura.split(' ')[0].split('/')
    const bFechaAperturaSplit = b.fecha_apertura.split(' ')[0].split('/')
    const aDay = aFechaAperturaSplit[0]
    const aMonth = aFechaAperturaSplit[1]
    const aYear = aFechaAperturaSplit[2]
    const bDay = bFechaAperturaSplit[0]
    const bMonth = bFechaAperturaSplit[1]
    const bYear = bFechaAperturaSplit[2]
    let a1 = date.buildDate({ year: aYear, date: aDay, month: aMonth })
    let b1 = date.buildDate({ year: bYear, date: bDay, month: bMonth })
    return a1 > b1 ? -1 : a1 < b1 ? 1 : 0
  })
}

export function setDetalleDaniosCerrados (state, data) {
  state.detalleDaniosCerradosState = data
  state.detalleDaniosCerradosState.forEach((detalleDanioCerrado, i) => {
    state.detalleDaniosAbiertosState.forEach((detalleDanioAbierto, j) => {
      if (detalleDanioCerrado.ID_DANIO === detalleDanioAbierto.incidente) {
        state.detalleDaniosAbiertosState[j]['GRUPO'] = detalleDanioCerrado.GRUPO
      }
    })
  })
  state.detalleDaniosCerradosState = state.detalleDaniosCerradosState.sort(function (a, b) {
    const aDay = a.FECHA_APERTURA.split('/')[0]
    const aMonth = a.FECHA_APERTURA.split('/')[1]
    const aYear = a.FECHA_APERTURA.split('/')[2]
    const bDay = b.FECHA_APERTURA.split('/')[0]
    const bMonth = b.FECHA_APERTURA.split('/')[1]
    const bYear = b.FECHA_APERTURA.split('/')[2]
    let a1 = date.buildDate({ year: aYear, date: aDay, month: aMonth })
    let b1 = date.buildDate({ year: bYear, date: bDay, month: bMonth })
    return a1 > b1 ? -1 : a1 < b1 ? 1 : 0
  })
}

export function setDetallePeticiones (state, data) {
  state.detallePeticionesState = data
}

export function setCodigosFamiliares (state, data) {
  state.codigosFamiliaresState = data
}

export function setInformacionLlamada (state, data) {
  state.informacionLlamadaState = data
}

export function setInfoGuionTratamientoCCCSoap (state, data) {
  state.infoGuionTratamientoCCCSoapState = data
}

export function setInfoGuionTratamientoCCCRest (state, data) {
  state.infoGuionTratamientoCCCRestState = data
}

export function setMensajePersonalizdo (state, data) {
  state.mensajePersonalizdoState = data
}

export function setOpenModal (state, data) {
  state.openModalState = data
}

export function setGuionLoading (state, data) {
  state.loadingState.guionLoading = data
}

export function setInfoClienteLoading (state, data) {
  state.loadingState.infoClienteLoading = data
}

export function setPortafolioLoading (state, data) {
  state.loadingState.portafolioLoading = data
}

export function setAbiertoLoading (state, data) {
  state.loadingState.abiertoLoading = data
}

export function setCerradoLoading (state, data) {
  state.loadingState.cerradoLoading = data
}

export function setPeticionesLoading (state, data) {
  state.loadingState.peticionesLoading = data
}

export function setIdentificacionBuscar (state, data) {
  state.identificacionBuscarState = data
}
