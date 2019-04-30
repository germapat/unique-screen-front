<template>
  <q-page padding class="docs-table">
    <div class="bg-home"></div>
    <q-card class="relative-position">
        <q-card-main>
          <div class="row gutter-xs q-mb-md">
            <div class="col-5">
                <blockquote>
                  <i class="material-icons">search</i> Log de servicios
                </blockquote>
            </div>
            <div class="col-3">
              <q-datetime
                :value="this.fechaDesde"
                @change="val => this.filtroFechaDesde(val)"
                type="datetime"
                color="blue-une-l"
                float-label="Desde la fecha"
                clearable
                />
            </div>
            <div class="col-3">
              <q-datetime
                :value="this.fechaHasta"
                @change="val => this.filtroFechaHasta(val)"
                type="datetime"
                color="blue-une-l"
                float-label="Hasta la fecha"
                clearable
                />
            </div>
            <div class="col">
            </div>
          </div>
          <q-table
            ref="table"
            :data="this.serverData"
            :columns="this.columns"
            row-key="name"
            :pagination.sync="serverPagination"
            @request="this.request"
            :loading="this.loading"
            :rows-per-page-options="[10 ,15, 20, 30, 50, 500]"
            >
            <template slot="body" slot-scope="props">
              <q-tr :props="props">
                <q-td key="usuario">{{ props.row.user.username }}</q-td>
                <q-td key="nameuser">{{ props.row.user.first_name }} {{ props.row.user.last_name }}</q-td>
                <q-td key="documento">{{ props.row.user.document }}</q-td>
                <q-td key="fecha">{{ props.row.created_at | formatDateTime }}</q-td>
                <q-td key="method">{{ props.row.method }}</q-td>
                <q-td key="timereponse">{{ props.row.timereponse }}</q-td>
                <q-td key="code">
                  <q-chip square :color="colorCode(props.row.code)">
                    {{ props.row.code }}
                  </q-chip>
                </q-td>
                <q-td key="servicio">{{ props.row.servicio }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { Loading } from 'quasar'

export default {
  data () {
    return {
      fechaDesde: '',
      fechaHasta: '',
      serverData: [],
      ordering: '-created_at',
      rowsPerPage: 10,
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10
      },
      columns: [
        { name: 'usuario', required: true, label: 'Usuario', align: 'left', field: 'user.username' },
        { name: 'nameuser', required: true, label: 'Nombre', align: 'left', field: 'nameuser' },
        { name: 'documento', required: true, label: 'Documento', align: 'left', field: 'user.document' },
        { name: 'created_at', required: true, label: 'Fecha', align: 'left', field: 'created_at', sortable: true },
        { name: 'method', required: true, label: 'Método', align: 'left', field: 'method', sortable: true },
        { name: 'timereponse', required: true, label: 'Tiempo en segundos', align: 'left', field: 'timereponse', sortable: true },
        { name: 'code', required: true, label: 'Código', align: 'left', field: 'code', sortable: true },
        { name: 'servicio', required: true, label: 'Servicio', align: 'left', field: 'servicio', sortable: true }
      ],
      filter: {
        fechaDesde: '',
        fechaHasta: ''
      },
      loading: false,
      tableData: []
    }
  },
  methods: {
    colorCode (code) {
      code = parseInt(code)
      if (code < 400) {
        return 'primary'
      } else if (code >= 400 && code < 500) {
        return 'warning'
      } else if (code >= 500) {
        return 'negative'
      } else {
        return 'secondary'
      }
    },
    reporteLogExcel () {
      Loading.show()
      Vue.prototype.$axios
        .get(`reporte_log_excel/`, {
          responseType: 'blob'
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'log.xls')
          document.body.appendChild(link)
          link.click()
        })
        .catch(() => {
        })
        .finally(() => {
          Loading.hide()
        })
    },
    filtroFechaDesde (val) {
      if (val === null) {
        this.fechaDesde = ''
      } else {
        this.fechaDesde = val
      }
      this.filter = {
        fechaDesde: this.fechaDesde,
        fechaHasta: this.fechaHasta
      }
      this.request({
        pagination: this.serverPagination
      })
    },
    filtroFechaHasta (val) {
      if (val === null) {
        this.fechaHasta = ''
      } else {
        this.fechaHasta = val
      }
      this.filter = {
        fechaDesde: this.fechaDesde,
        fechaHasta: this.fechaHasta
      }
      this.request({
        pagination: this.serverPagination
      })
    },
    request ({ pagination }) {
      this.loading = true

      const filtroFecha = `&created_at__gte=${this.filter.fechaDesde}&created_at__lte=${this.filter.fechaHasta}`
      if (pagination.descending) {
        this.ordering = '-' + pagination.sortBy
      } else {
        this.ordering = pagination.sortBy
      }
      let offset = pagination.page * pagination.rowsPerPage - pagination.rowsPerPage
      let url = `log_request/?limit=${pagination.rowsPerPage}&offset=${offset}&ordering=${this.ordering}`
      Vue.prototype.$axios
        .get(url + filtroFecha)
        .then(response => {
          this.url_previous = response.data.previous
          this.url_next = response.data.next
          this.tableData = response.data.results
          this.serverPagination = pagination
          this.serverPagination.rowsNumber = response.data.count
          pagination.rowsNumber = response.data.count
          this.serverData = this.tableData
          this.loading = false
        })
        .catch(authError => {})
        .finally(() => {})
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination
    })
  }
}
</script>
