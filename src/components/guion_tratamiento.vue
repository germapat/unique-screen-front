<template>
    <q-card class="relative-position" :class="'bg-'+this.colorTratemientoState">
        <q-card-main>
          <blockquote>
            <i class="material-icons">note</i>
            <span class="text-black"> Guion del Tratamiento <strong>{{this.guionTratamiento.tratamiento}}</strong></span>
          </blockquote>
          <hr>
          <div class="row" v-show="this.guionTratamiento.guion">
              <span>{{this.guionTratamiento.guion}}</span>
          </div>
          <hr>
          <div class="row" v-show="this.guionTratamiento.TT">
              <strong>TT: {{this.guionTratamiento.TT}}</strong>
          </div>
          <div class="row items-center" v-show="this.mensajePersonalizdoState">
              <div class="col-12 q-mb-sm">
                <strong>Notificación: </strong>
                <q-chip class="q-ml-sm" :color="colorMSJ" :small="true">{{this.mensajePersonalizdoState}} </q-chip>
              </div>
              <span class="col-12 text-black">{{guionNotificacion}}</span>
          </div>
        </q-card-main>
        <q-inner-loading dark :visible="this.loadingState.guionLoading">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
    </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    ...mapState('cliente', [
      'mensajePersonalizdoState',
      'informacionClienteState',
      'infoGuionTratamientoCCCSoapState',
      'infoGuionTratamientoCCCRestState',
      'detalleDaniosAbiertosState',
      'loadingState',
      'portafolioState'
    ]),
    ...mapState('style', ['colorTratemientoState']),
    colorMSJ: function () {
      switch (this.mensajePersonalizdoState) {
        case 'Directivo TigoUne':
          return 'indigo'
        case 'Cliente Critico':
          return 'purple'
        case 'Atencion Especial':
          return 'warning'
        case 'Migración HFC':
          return 'primary'
      }
      return 'positive'
    },
    guionNotificacion: function () {
      switch (this.mensajePersonalizdoState) {
        case 'Directivo TigoUne':
          return 'Recuerda que hace parte de nuestra empresa, genera mayor prioridad en la solución de su caso, apóyate en un líder de experiencia.'
        case 'Cliente Critico':
          return 'Escucha con atención y realiza descartes acordes a su caso. Dale la importancia que merece.'
        case 'Migración HFC':
          return 'Trata de persuadir al cliente para lograr la migración (Resalta los beneficios como: más velocidad y más contenido TV) y recuerda realizar el registro en GDI'
      }
      return ''
    },
    guionTratamiento: function () {
      let productos = ''
      let fechaSolucion = ''
      let guion = ''
      let numeroTT = ''
      let tratamiento = this.informacionClienteState.tratamiento
      if (this.infoGuionTratamientoCCCSoapState) {
        const elementArray = this.infoGuionTratamientoCCCSoapState
        for (let index = 0; index < elementArray.length; index++) {
          const element = elementArray[index]
          if (typeof element.tt_fecha_sol === 'object') {
            tratamiento = 'CAUSA COMÚN'
            productos += element.productName + ', '
            if (element.tt_fecha_sol[0].Hora_solucion < 0 || element.tt_fecha_sol[0].Hora_solucion > 72) {
              fechaSolucion = 'lo mas pronto posible.'
            } else {
              fechaSolucion = Math.round(element.tt_fecha_sol[0].Hora_solucion) + ' Horas'
            }
            numeroTT = element.tt_fecha_sol[0].TT
          }
        }
      }
      if (this.infoGuionTratamientoCCCRestState['ccc']) {
        const elementsArray = this.infoGuionTratamientoCCCRestState['ccc']
        productos = ''
        for (let index = 0; index < elementsArray.length; index++) {
          tratamiento = 'CAUSA COMÚN'
          const element = elementsArray[index]
          productos += element.nombre_producto + ', '
          if (element.fecha_solucion) {
            if (element.Hora_solucion < 0 || element.Hora_solucion > 72) {
              fechaSolucion = 'lo mas pronto posible.'
            } else {
              fechaSolucion = Math.round(element.Hora_solucion) + ' Horas'
            }
          }
          if (element.tt) {
            numeroTT = element.tt
          }
        }
      }
      if (this.detalleDaniosAbiertosState && (tratamiento === '' || tratamiento === 'DAÑO ABIERTO')) {
        const elementArray = this.detalleDaniosAbiertosState
        for (let index = 0; index < elementArray.length; index++) {
          tratamiento = 'DAÑO ABIERTO'
          const element = elementArray[index]
          productos += element.producto + ', '
        }
      }
      if (tratamiento === '') {
        const serviciosSuspendidos = this.portafolioState.filter(a => {
          if (a.estado_producto !== 'Active') {
            return true
          } else {
            return false
          }
        })
        if (serviciosSuspendidos.length > 0) {
          tratamiento = 'Cliente Suspendido'
        }
      }
      switch (tratamiento) {
        case 'CAUSA COMÚN':
          if (productos) {
            productos = productos.substring(0, (productos.length - 2))
            this.colorCCC()
            productos = productos.toLocaleUpperCase()
            fechaSolucion = fechaSolucion.replace('T', ' ')
            guion = `En este momento tenemos inconvenientes técnicos que afecta tus servicios de ${productos} en tu sector, estamos trabajando para restablecer tu servicio en ${fechaSolucion}`
            return {'tratamiento': tratamiento, 'guion': guion, 'TT': numeroTT}
          }
          break
        case 'DAÑO ABIERTO':
          if (productos) {
            productos = productos.substring(0, (productos.length - 2))
            this.colorDanioAbierto()
            productos = productos.toLocaleUpperCase()
            // guion = `Tu servicio de ${productos} tiene un reporte de daño en proceso de reparación`
            guion = `Sr(a) en el momento ya cuenta con un reporte abierto con el servicio de ${productos} permítame reviso el detalle de su caso para informarle como lograremos solucionar su solicitud. (No olvides dejar la nota en los sistemas).`
            return {'tratamiento': tratamiento, 'guion': guion, 'TT': null}
          }
          break
        case 'CLAVE WIFI':
          this.colorCambioWifi()
          guion = `Recomienda al usuario establecer una contraseña con caracteres alfanuméricos para mejorar su seguridad en la red Inalámbrica. (Genera interés por su seguridad).`
          return {'tratamiento': tratamiento, 'guion': guion, 'TT': null}
        case 'Cliente Suspendido':
          this.colorClienteSuspendido()
          guion = `Sr(a) su servicio se encuentra suspendido porque no está al día, lo invitamos a realizar los pagos para que siga disfrutando de nuestros servicios.`
          return {'tratamiento': tratamiento, 'guion': guion, 'TT': null}
        default:
          this.colorDefault()
          break
      }
      return {'tratamiento': '', 'guion': '', 'TT': ''}
    }
  },
  methods: {
    ...mapActions('style', ['colorCCC', 'colorDanioAbierto', 'colorCambioWifi', 'colorClienteSuspendido', 'colorDefault'])
  }
}
</script>

<style>
</style>
