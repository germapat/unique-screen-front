<template>
    <div>
        <q-list class="q-mb-sm">
            <q-collapsible :opened="true" icon="check" label="Detalles de daños abiertos">
                <div class="relative-position">
                    <q-table
                        :data="detalleDaniosAbiertosState"
                        :columns="columnsDaniosAbiertos"
                        row-key="table_danios_cerrados"
                        >
                        <template slot="body" slot-scope="props">
                          <q-tr :props="props">
                              <q-td key="producto" :props="props">{{ props.row.producto }}</q-td>
                              <q-td key="incidente" :props="props">{{ props.row.incidente }}</q-td>
                              <q-td key="Grupo" :props="props">{{ props.row.GRUPO }}</q-td>
                              <q-td key="fecha_apertura" :props="props">{{ props.row.fecha_apertura | formatDate }}</q-td>
                              <q-td key="identificador" :props="props">{{ props.row.identificador }}</q-td>
                              <q-td key="naturaleza" :props="props">{{ props.row.naturaleza }}</q-td>
                              <q-td key="estado" :props="props">{{ props.row.estado }}</q-td>
                              <q-td key="tt" :props="props">{{ props.row.tt }}</q-td>
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
                    <q-inner-loading dark :visible="this.loadingState.abiertoLoading">
                        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                    </q-inner-loading>
                </div>
            </q-collapsible>
        </q-list>
        <q-list>
            <q-collapsible :opened="true" icon="close" label="Detalles últimos daños">
                <div class="relative-position">
                    <q-table
                        class="q-mt-lg"
                        :data="detalleDaniosCerradosState"
                        :columns="columnsDaniosCerrados"
                        row-key="table_danios_cerrados"
                        >
                        <template slot="body" slot-scope="props">
                          <q-tr :props="props">
                              <q-td key="Producto" :props="props">{{ props.row.PRODUCTO }}</q-td>
                              <q-td key="ID_DAÑO" :props="props">{{ props.row.ID_DANIO }}</q-td>
                              <q-td key="Estado" :props="props">{{ props.row.ESTADO }}</q-td>
                              <q-td key="Fecha_Apertura" :props="props">{{ props.row.FECHA_APERTURA | formatDate }}</q-td>
                              <q-td key="Fecha_Cerrado" :props="props">{{ props.row.FECHA_CERRADO | formatDate }}</q-td>
                              <q-td key="Grupo" :props="props">{{ props.row.GRUPO }}</q-td>
                              <q-td key="Prioridad" :props="props">{{ props.row.PRIORIDAD }}</q-td>
                              <q-td key="Dirección" :props="props">{{ props.row.DIRECCION }}</q-td>
                              <q-td key="Municipio" :props="props">{{ props.row.MUNICIPIO }}</q-td>
                              <q-td key="Causa_Raiz" :props="props">{{ props.row.CAUSA_RAIZ }}</q-td>
                              <q-td key="Reparacion" :props="props">{{ props.row.REPARACION }}</q-td>
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
                    <q-inner-loading dark :visible="this.loadingState.cerradoLoading">
                        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                    </q-inner-loading>
                </div>
            </q-collapsible>
        </q-list>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // name: 'ComponentName',
  computed: {
    ...mapState('cliente', [
      'detalleDaniosAbiertosState',
      'detalleDaniosCerradosState',
      'loadingState',
      'informacionClienteState'
    ])
  },
  data () {
    return {
      columnsDaniosAbiertos: [
        { name: 'producto', label: 'Producto', sortable: true, align: 'left' },
        { name: 'incidente', label: 'Incidente', sortable: true, align: 'left' },
        { name: 'Grupo', label: 'Grupo', sortable: true, align: 'left' },
        { name: 'fecha_apertura', label: 'Fecha apertura', sortable: true, align: 'left' },
        { name: 'identificador', label: 'Identificador', sortable: true, align: 'left' },
        { name: 'naturaleza', label: 'Naturaleza', sortable: true, align: 'left' },
        { name: 'estado', label: 'Estado', sortable: true, align: 'left' },
        { name: 'tt', label: 'TT', sortable: true, align: 'left' }
      ],
      columnsDaniosCerrados: [
        { name: 'Producto', label: 'Producto', sortable: true, align: 'left' },
        { name: 'ID_DAÑO', label: 'Incidente', sortable: true, align: 'left' },
        { name: 'Estado', label: 'Estado', sortable: true, align: 'left' },
        { name: 'Fecha_Apertura', label: 'Fecha apertura', sortable: true, align: 'left' },
        { name: 'Fecha_Cerrado', label: 'Fecha cerrado', sortable: true, align: 'left' },
        { name: 'Grupo', label: 'Grupo', sortable: true, align: 'left' },
        { name: 'Prioridad', label: 'Prioridad', sortable: true, align: 'left' },
        { name: 'Dirección', label: 'Dirección', sortable: true, align: 'left' },
        { name: 'Municipio', label: 'Municipio', sortable: true, align: 'left' },
        { name: 'Causa_Raiz', label: 'Causa raíz', sortable: true, align: 'left' },
        { name: 'Reparacion', label: 'Reparación', sortable: true, align: 'left' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
