<template>
  <q-layout>
    <q-layout-header>
      <!-- <q-toolbar
        :color="this.colorTratemientoState"
        :inverted="$q.theme === 'ios'"
      > -->
      <q-toolbar color="blue-une">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title class="row">
          <img height="30px" src="../statics/pu.png" alt=""> <img style="margin-left: 10px;" height="30px" src="../statics/emtelco.png" alt="">
        </q-toolbar-title>
        <div class="q-mr-sm">
          <span slot="subtitle">{{ nombreCompleto }}</span>
        </div>
        <div>
          <q-btn v-if="this.$libs.isAuthenticated()" color="negative" icon = "exit_to_app" @click="logOut">
            <q-tooltip>
              Cerrar sesión
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item to="home">
          <q-item-side icon="home" />
          <q-item-main label="Inicio"/>
        </q-item>
        <q-item to="log" v-if="this.$libs.hasPermission(['operation.view_logrequest'])">
          <q-item-side icon="bug_report"/>
          <q-item-main label="Log de servicios"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <div class="q-mx-sm">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import {mapState} from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL,
    logOut () {
      localStorage.clear()
      this.$router.push({path: '/'})
    }
  },
  computed: {
    ...mapState('style', ['colorTratemientoState']),
    nombreCompleto: function () {
      return localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')
    }
  },
  beforeCreate () {
    if (!this.$libs.isAuthenticated()) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
 .padding-20 {
   padding: 20px;
 }
</style>
