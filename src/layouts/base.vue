<template>
  <q-layout>
      <div class="padding-20">
        <router-view />
      </div>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logOut () {
      localStorage.clear()
      this.$router.push({path: '/'})
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
