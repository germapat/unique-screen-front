<template>
  <div class="gutter-xs">
    <div class="bg-home"></div>
    <div class="row gutter-xs">
      <div class="col-xl-3 col-lg-4 col-md-4 col-12">
        <buscar ref='componentBuscar'></buscar>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-8 col-12">
        <guion-tratamiento></guion-tratamiento>
      </div>
    </div>
    <div class="row gutter-xs">
      <div class="col-12">
        <informacion-cliente></informacion-cliente>
      </div>
      <div class="col-12">
        <q-tabs class="shadow-1" animated color="blue-une" align="justify">
          <q-tab default name="detalle_portafolio" slot="title" label="Detalle del portafolio" />
          <q-tab name="detalle_danios" slot="title" label="Detalle daños" />
          <q-tab name="detalle_peticiones" slot="title" label="Detalle peticiones" />
          <q-tab-pane name="detalle_portafolio">
            <blockquote>
              Detalle del portafolio
            </blockquote>
            <detalle-portadolio></detalle-portadolio>
          </q-tab-pane>
          <q-tab-pane name="detalle_danios">
            <detalle-danios></detalle-danios>
          </q-tab-pane>
          <q-tab-pane name="detalle_peticiones">
            <blockquote>
              Detalle peticiones
            </blockquote>
            <detalle-peticiones></detalle-peticiones>
          </q-tab-pane>
        </q-tabs>
      </div>
    </div>
    <q-modal v-model="openModal" :content-css="{minWidth: '50vw'}" :no-backdrop-dismiss="true" :no-esc-dismiss="true">
      <div style="padding: 20px 30px">
        <blockquote>
          <i class="material-icons">code</i> Codigos Familiares
        </blockquote>
        <q-table
          :data="codigosFamiliaresState"
          :columns="columnsCodigosFamiliares"
          row-key="name"
          >
          <template slot="body" slot-scope="props">
            <q-tr :props="props">
              <q-td key="radioCodigoFamiliar" :props="props">
                <q-btn round size="sm" color="primary" icon="search" @click="btnCodigoFamiliarcliende(props.row.codigo_familiar)"/>
              </q-td>
              <q-td key="direccion" :props="props">
                {{ props.row.direccion }}
              </q-td>
              <q-td key="municipio" :props="props">{{ props.row.municipio }}</q-td>
              <q-td key="departamento" :props="props">{{ props.row.departamento }}</q-td>
              <q-td key="codigo_familiar" :props="props">{{ props.row.codigo_familiar }}</q-td>
              <q-td key="crm" :props="props">{{ props.row.crm }}</q-td>
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
        <div class="row justify-end">
          <q-btn class="q-mt-md q-mr-md" color="grey-5" @click="cerrarModal" label="Cerrar " />
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import Buscar from 'components/buscar'
import InformacionCliente from 'components/informacion_cliente'
import GuionTratamiento from 'components/guion_tratamiento'
import DetalleDanios from 'components/detalle_danios'
import DetallePeticiones from 'components/detalle_peticiones'
import DetallePortadolio from 'components/detalle_portafolio'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      columnsCodigosFamiliares: [
        { name: 'radioCodigoFamiliar', label: '', sortable: true, align: 'left' },
        { name: 'direccion', label: 'Dirección', sortable: true, align: 'left' },
        { name: 'municipio', label: 'Municipio', sortable: true, align: 'left' },
        { name: 'departamento', label: 'Departamento', sortable: true, align: 'left' },
        { name: 'codigo_familiar', label: 'Codigo familiar', sortable: true, align: 'left' },
        { name: 'crm', label: 'CRM', sortable: true, align: 'left' }
      ]
    }
  },
  components: {
    Buscar,
    InformacionCliente,
    GuionTratamiento,
    DetalleDanios,
    DetallePeticiones,
    DetallePortadolio
  },
  computed: {
    ...mapState('cliente', [
      'openModalState',
      'codigosFamiliaresState'
    ]),
    openModal: {
      get () {
        return this.openModalState
      },
      set (value) {
        this.setOpenModal(value)
      }
    }
  },
  methods: {
    ...mapMutations('cliente', ['setOpenModal']),
    ...mapActions('cliente', ['getDocumentoCliende', 'conenctarSocket', 'loadingHideAction']),
    btnCodigoFamiliarcliende (optionCodigoFamiliar) {
      this.getDocumentoCliende(
        {
          'tipoDocumento': 'codigo_familiar',
          'documento': optionCodigoFamiliar,
          'identification': this.$refs.componentBuscar.modelIdentificacion
        }
      )
    },
    cerrarModal () {
      this.openModal = false
      this.loadingHideAction()
    }
  },
  mounted () {
    this.conenctarSocket()
  }
}
</script>
<style>
  [data-tab-name='detalle_portafolio'].active,
  [data-tab-name='detalle_danios'].active,
  [data-tab-name='detalle_peticiones'].active {
    background-color: #bdbdbd;
  }
</style>
