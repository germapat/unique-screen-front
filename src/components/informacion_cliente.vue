<template>
  <q-card class="relative-position">
    <q-card-title>
       <blockquote>
        <i class="material-icons">person_pin</i> Información del Cliente
      </blockquote>
    </q-card-title>
    <q-card-main>
      <div class="row gutter-y-sm">
        <div class="col-xl-3 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <q-icon name="person" />
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Nombre del cliente</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.nombre_cliente}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <q-icon name="credit_card" />
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Identificación del cliente</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.identificacion_cliente}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-4 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <q-icon name="place" />
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Dirección</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.direccion}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <q-icon name="code" />
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Código familiar</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.codigo_familiar}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <i class="material-icons">map</i>
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Ciudad</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.ciudad}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <i class="material-icons">terrain</i>
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Departamento</span>
            </q-item-tile>
            <q-item-tile>{{informacionClienteState.departamento}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <i class="material-icons">turned_in_not</i>
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">ANI</span>
            </q-item-tile>
            <q-item-tile>{{informacionLlamadaState.primary_ani}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <i class="material-icons">turned_in</i>
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">ID de la llamada actual</span>
            </q-item-tile>
            <q-item-tile>{{informacionLlamadaState.ucid}}</q-item-tile>
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-4 col-12 row">
          <div class="icon-form flex flex-center items-baseline">
            <i class="material-icons">confirmation_number</i>
          </div>
          <div>
            <q-item-tile>
              <span class="text-bold-500">Número de contrato</span>
            </q-item-tile>
            <q-item-tile>
              <ul class="q-ma-none q-pl-md">
                <li v-for="(contrato, index) in informacionClienteState.contratos" :key="index">
                  <span>{{ contrato.contrato }} - {{ contrato.sourceName }}</span>
                </li>
              </ul>
            </q-item-tile>
          </div>
        </div>
      </div>
    </q-card-main>
    <q-inner-loading dark :visible="this.loadingState.infoClienteLoading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-card>
</template>

<script>
import {mapState} from 'vuex'

export default {
  // name: 'ComponentName',
  computed: {
    ...mapState('cliente', ['informacionClienteState', 'informacionLlamadaState', 'loadingState'])
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
