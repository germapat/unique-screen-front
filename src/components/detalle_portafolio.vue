<template>
  <div class="relative-position">
    <q-table
      :data="portafolioState"
      :columns="columns"
      row-key="table_portafolios"
      >
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="servicio">
            <q-checkbox color="green-emtelco" v-model="props.row.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
            <span>{{ props.row.servicio }}</span>
          </q-td>
          <q-td key="identificador">
            <span>{{ props.row.identificador }}</span>
          </q-td>
          <q-td key="tecnologia">
            <span>{{ props.row.tecnologia | tecnologiaFilter }}</span>
          </q-td>
          <q-td key="uso">
            <span>{{ props.row.uso }}</span>
          </q-td>
          <q-td key="plan">
            <span>{{ props.row.plan }}</span>
          </q-td>
          <q-td key="estado_producto">
            <span>{{ props.row.estado_producto | estadoProducto }}</span>
            <q-icon v-if="props.row.estado_producto== 'Active'" class="q-ml-sm" name="check_circle_outline" color="positive" size="24px" />
            <q-icon v-else class="q-ml-sm" name="highlight_off" color="negative" size="24px" />
          </q-td>
        </q-tr>
        <q-tr v-show="props.row.expand && (props.row.paquetes.length > 0 || props.row.equipos.length > 0)" :props="props">
          <q-td colspan="100%">
            <div v-if="props.row.servicio === 'Telefonía'" class="row justify-center gutter-xs">
                <div :class="props.row.paquetes.length > 0 ? 'responsive-table col-8' : 'responsive-table col-12'" v-if="props.row.equipos.length > 0">
                  <blockquote>
                    <i class="material-icons">devices_other</i> Equipos
                  </blockquote>
                  <q-table
                    :data="props.row.equipos"
                    :columns="columnsEquiposTelefonia"
                    row-key="name"
                    >
                    <template slot="body" slot-scope="props">
                      <q-tr :props="props">
                        <q-td key="tecnologia">
                          <span>{{ props.row.tecnologia | tecnologiaFilter }}</span>
                        </q-td>
                        <q-td key="numero_telefonico">
                          <span>{{ props.row.numero_telefonico }}</span>
                        </q-td>
                        <q-td key="tipo_equipo">
                          <span>{{ props.row.tipo_equipo }}</span>
                        </q-td>
                        <q-td key="fabricante">
                          <span>{{ props.row.fabricante }}</span>
                        </q-td>
                        <q-td key="referencia">
                          <span>{{ props.row.referencia }}</span>
                        </q-td>
                        <q-td key="mac">
                          <span>{{ props.row.mac }}</span>
                        </q-td>
                        <q-td key="serial">
                          <span>{{ props.row.serial }}</span>
                        </q-td>
                        <q-td key="product_id">
                          <span>{{ props.row.product_id }}</span>
                        </q-td>
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
                </div>
                <div :class="props.row.equipos.length > 0 ? 'col-4' : 'col-6'" v-if="props.row.paquetes.length > 0">
                  <blockquote>
                    <i class="material-icons">more_horiz</i> Servicios especiales y discados
                  </blockquote>
                  <q-table
                    :data="props.row.paquetes"
                    :columns="columnsPaquetesTelefonia"
                    row-key="name"
                    >
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
                </div>
            </div>
            <div v-else class="row justify-center justify-center gutter-xs">
                <div :class="props.row.paquetes.length > 0 ? 'responsive-table col-8' : 'responsive-table col-12'" v-if="props.row.equipos.length > 0">
                  <blockquote>
                    <i class="material-icons">devices_other</i> Equipos
                  </blockquote>
                  <q-table
                    :data="props.row.equipos"
                    :columns="columnsEquipos"
                    row-key="name"
                    >
                    <template slot="body" slot-scope="props">
                      <q-tr :props="props">
                        <q-td key="tecnologia">
                          <span>{{ props.row.tecnologia | tecnologiaFilter }}</span>
                        </q-td>
                        <q-td key="tipo_equipo">
                          <span>{{ props.row.tipo_equipo }}</span>
                        </q-td>
                        <q-td key="fabricante">
                          <span>{{ props.row.fabricante }}</span>
                        </q-td>
                        <q-td key="referencia">
                          <span>{{ props.row.referencia }}</span>
                        </q-td>
                        <q-td key="mac">
                          <span>{{ props.row.mac }}</span>
                        </q-td>
                        <q-td key="serial">
                          <span>{{ props.row.serial }}</span>
                        </q-td>
                        <q-td key="product_id">
                          <span>{{ props.row.product_id }}</span>
                        </q-td>
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
                </div>
                <div :class="props.row.equipos.length > 0 ? 'col-4' : 'col-6'" v-if="props.row.paquetes.length > 0">
                   <blockquote>
                    <i class="material-icons">more_horiz</i> Servicios especiales y discados
                  </blockquote>
                  <q-table
                    :data="props.row.paquetes"
                    :columns="columnsPaquetes"
                    row-key="name"
                    >
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
                </div>
            </div>
          </q-td>
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
    <q-inner-loading dark :visible="this.loadingState.portafolioLoading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  // name: 'ComponentName',
  computed: {
    ...mapState('cliente', ['portafolioState', 'loadingState'])
  },
  data () {
    return {
      columns: [
        { name: 'servicio', label: 'Servicio', field: 'servicio', sortable: true, align: 'left' },
        { name: 'identificador', label: 'Identificador', field: 'identificador', sortable: true, align: 'left' },
        { name: 'tecnologia', label: 'Tecnología', field: 'tecnologia', align: 'left' },
        { name: 'uso', label: 'Uso', field: 'uso', align: 'left' },
        { name: 'plan', label: 'Plan', field: 'plan', align: 'left' },
        { name: 'estado_producto', label: 'Estado del producto', field: 'estado_producto', align: 'left' }
      ],
      columnsEquipos: [
        { name: 'tecnologia', label: 'Tecnología', field: 'tecnologia', align: 'left' },
        { name: 'tipo_equipo', label: 'Tipo', field: 'tipo_equipo', align: 'left' },
        { name: 'fabricante', label: 'Fabricante', field: 'fabricante', align: 'left' },
        { name: 'referencia', label: 'Referencia', field: 'referencia', align: 'left' },
        { name: 'mac', label: 'Mac', field: 'mac', align: 'left' },
        { name: 'serial', label: 'Serial', field: 'serial', align: 'left' },
        { name: 'product_id', label: 'Id producto', field: 'product_id', align: 'left' }
      ],
      columnsEquiposTelefonia: [
        { name: 'tecnologia', label: 'Tecnología', field: 'tecnologia', align: 'left' },
        { name: 'numero_telefonico', label: 'Numero telefónico', field: 'numero_telefonico', sortable: true, align: 'left' },
        { name: 'tipo_equipo', label: 'Tipo', field: 'tipo_equipo', align: 'left' },
        { name: 'fabricante', label: 'Fabricante', field: 'fabricante', align: 'left' },
        { name: 'referencia', label: 'Referencia', field: 'referencia', align: 'left' },
        { name: 'mac', label: 'Mac', field: 'mac', align: 'left' },
        { name: 'serial', label: 'Serial', field: 'serial', align: 'left' },
        { name: 'product_id', label: 'Id producto', field: 'product_id', align: 'left' }
      ],
      columnsPaquetes: [
        { name: 'paquete', label: 'Paquete adicional', field: 'paquete', sortable: true, align: 'left' }
      ],
      columnsPaquetesTelefonia: [
        { name: 'paquete', label: 'Servicio especial o discado', field: 'paquete', sortable: true, align: 'left' }
      ]
    }
  }
}
</script>

<style>
</style>
