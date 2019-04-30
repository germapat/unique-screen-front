<template>
  <q-card >
    <q-card-main>
      <blockquote>
        <i class="material-icons">search</i> Buscador
      </blockquote>
      <div class="row items-end gutter-xs">
        <div class="col-lg-12 col-12">
          <q-field
            :error="modelIdentificacionError"
            :error-label="modelIdentificacionErrorMensaje"
            >
            <q-search color="grey-8" v-model="modelIdentificacion" @input="checngeIdentificacion" v-on:keyup.enter="btnDocumentocliende()" placeholder="Ingrese identificación" float-label="Ingrese identificación (CC, Nit, CE, CV)" />
          </q-field>
        </div>
        <div class="col-lg-12 col-12 text-center row">
          <div class="padding row col-6">
            <q-btn @click="btnVaciarInformacionCliente()" class="col-12" color="grey-5"  label="Limpiar"/>
          </div>
          <div class="padding row col-6">
            <q-btn @click="btnDocumentocliende()" class="col-12" color="blue-une-l"  label="Buscar"/>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  // name: 'ComponentName',
  data () {
    return {
      modelIdentificacionError: false,
      modelIdentificacionErrorMensaje: 'Solo se permiten caracteres alfanuméricos'
    }
  },
  computed: {
    ...mapState('cliente', ['identificacionBuscarState']),
    modelIdentificacion: {
      set (value) {
        this.identificacionBuscarAction(value)
      },
      get () {
        return this.identificacionBuscarState
      }
    }
  },
  methods: {
    ...mapActions('cliente', [
      'getDocumentoCliende',
      'vaciarInformacionCliente',
      'identificacionBuscarAction'
    ]),
    checngeIdentificacion () {
      const patt = new RegExp('^[0-9a-zA-Z ]+$')
      if (this.modelIdentificacion === undefined || this.modelIdentificacion === '') {
        this.modelIdentificacionError = true
        this.modelIdentificacionErrorMensaje = 'Este campo es requerido'
      } else if (!patt.test(this.modelIdentificacion)) {
        this.modelIdentificacionError = true
        this.modelIdentificacionErrorMensaje = 'Solo se permiten caracteres alfanuméricos'
      } else if (this.modelIdentificacionError !== '') {
        this.modelIdentificacionError = false
      }
    },
    btnDocumentocliende () {
      const patt = new RegExp('^[0-9a-zA-Z ]+$')
      if (this.modelIdentificacion === undefined || this.modelIdentificacion === '') {
        this.modelIdentificacionError = true
        this.modelIdentificacionErrorMensaje = 'Este campo es requerido'
        this.vaciarInformacionCliente()
      } else if (!patt.test(this.modelIdentificacion)) {
        this.modelIdentificacionError = true
        this.modelIdentificacionErrorMensaje = 'Solo se permiten caracteres alfanuméricos'
      } else {
        const data = {
          'tipoDocumento': 'cc',
          'documento': this.modelIdentificacion
        }
        this.modelIdentificacionError = false
        this.getDocumentoCliende(data)
      }
    },
    btnVaciarInformacionCliente () {
      this.vaciarInformacionCliente()
      this.modelIdentificacion = ''
    }
  }
}
</script>

<style>
</style>
