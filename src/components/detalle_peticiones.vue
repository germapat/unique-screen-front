<template>
    <div class="relative-position">
        <q-table
          :data="detallePeticionesState"
          :columns="columnsPeticiones"
          row-key="table_peticiones"
          :binary-state-sort="true"
          row="10"
          >
          <template slot="body" slot-scope="props">
            <q-tr :props="props">
              <q-td key="servicio_suscrito">{{ props.row.SERVICIO_SUSCRITO }}</q-td>
              <q-td key="contrato">{{ props.row.CONTRATO }}</q-td>
              <q-td key="servicio">{{ props.row.SERVICIO }}</q-td>
              <q-td key="peticion">{{ props.row.PETICION }}</q-td>
              <q-td key="tipo_peticion">{{ props.row.TIPO_PETICION }}</q-td>
              <q-td key="fecha_peticion">{{ props.row.FECHA_PETICION | formatDate }}</q-td>
              <q-td key="estado_peticion">
                <q-chip class="q-ml-sm" color="info" :small="true" v-if="props.row.ESTADO_PETICION === 'PENDIENTE'">{{ props.row.ESTADO_PETICION }}</q-chip>
                <span class="q-ml-sm" color="info" :small="true" v-else="">{{ props.row.ESTADO_PETICION }}</span>
              </q-td>
              <q-td key="fecha_atencion">{{ props.row.FECHA_ATENCION | formatDate }}</q-td>
              <q-td key="anterior">{{ props.row.VAL_ANTERIOR }}</q-td>
              <q-td key="nuevo">{{ props.row.VAL_NUEVO }}</q-td>
              <q-td key="ciclico_registro">{{ props.row.CICLICO_REGISTRO }}</q-td>
              <q-td key="ciclico_atencion">{{ props.row.CICLICO_ATENCION }}</q-td>
            </q-tr>
          </template>
          <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
            <q-btn
              round dense size="sm" icon="undo" :color="$libs.colorPaginacionPrevious(props.pagination.page)" class="q-mr-sm"
              :disable="props.isFirstPage"
              @click="props.prevPage"
            />
            <div class="q-mr-sm" style="font-size: small">Page {{ props.pagination.page }} / {{ props.pagesNumber }}</div>
            <q-btn
              round dense size="sm" icon="redo" :color="$libs.colorPaginacionNext(props.pagination.page, props.pagesNumber)"
              :disable="props.isLastPage"
              @click="props.nextPage"
            />
          </div>
        </q-table>
        <q-inner-loading dark :visible="this.loadingState.peticionesLoading">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // name: 'ComponentName',
  computed: {
    ...mapState('cliente', ['detallePeticionesState', 'loadingState'])
  },
  data () {
    return {
      columnsPeticiones: [
        { name: 'servicio_suscrito', label: 'Servicio suscrito', field: 'servicio_suscrito', sortable: true, align: 'left' },
        { name: 'contrato', label: 'Número de contrato', field: 'contrato', sortable: true, align: 'left' },
        { name: 'servicio', label: 'Servicio', field: 'servicio', sortable: true, align: 'left' },
        { name: 'peticion', label: 'Petición', field: 'peticion', sortable: true, align: 'left' },
        { name: 'tipo_peticion', label: 'Tipo petición', field: 'tipo_peticion', sortable: true, align: 'left' },
        { name: 'fecha_peticion', label: 'Fecha petición', field: 'fecha_peticion', sortable: true, align: 'left' },
        { name: 'estado_peticion', label: 'Estado petición', field: 'estado_peticion', sortable: true, align: 'left' },
        { name: 'fecha_atencion', label: 'Fecha atención', field: 'fecha_atencion', sortable: true, align: 'left' },
        { name: 'anterior', label: 'Anterior', field: 'anterior', sortable: true, align: 'left' },
        { name: 'nuevo', label: 'Nuevo', field: 'nuevo', sortable: true, align: 'left' },
        { name: 'ciclico_registro', label: 'Cíclico registro', field: 'ciclico_registro', sortable: true, align: 'left' },
        { name: 'ciclico_atencion', label: 'Cíclico atención', field: 'ciclico_atencion', sortable: true, align: 'left' }
      ]
    }
  }
}
</script>

<style>
</style>
