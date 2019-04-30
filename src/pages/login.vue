<template>
<div id="login" class="flex flex-center">
    <div class="container-left">
        <div class="container-form flex flex-center">
            <div class="form-login">
                <div class="logo"></div>
                <div class="form-inputs">
                    <div class="row">
                        <div class="col-12 text-center description">
                            <p>Eso que <span>necesitas</span>, en un solo lugar.</p>
                        </div>
                        <div class="col-12 button-login text-center"><br>
                            <div class="col-12 row">
                              <div class="col-12">
                                <q-field icon="account_circle">
                                  <q-input color="grey-8" v-model.trim="data.username" @keyup.enter="login" float-label="Usuario *" />
                                </q-field>
                              </div>
                              <div class="col-12"><br>
                                <q-field icon="lock">
                                  <q-input color="grey-8" v-model.trim="data.password" type="password" @keyup.enter="login" float-label="Contraseña *" />
                                </q-field>
                              </div>
                            </div>
                            <!-- TERCERO -->
                            <div class="col-12 row btn-login q-mt-sm">
                              <div class="col-12"><br></div>
                              <div class="col-12 row">
                                <q-btn class="col-12"
                                  :loading="loader"
                                  color="green-emtelco"
                                  label="Ingresar"
                                  type="submit"
                                  id="submit"
                                  @click="login"
                                />
                              </div>
                              <div class="col-12 password"><br>
                                <a target="_black" href="http://web.emtelco.co/showLogin.cc">¿Olvidó su contraseña?</a>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="logo2"></div>
                <div class="copyright">
                    Copyright © 2019 Emtelco S.A.S Med/Col <br> Gerencia de Ingeniería y Desarrollo |   <a href="https://www.emtelco.com.co/ZonaE/sites/default/files/politicas_de_privacidad.pdf" target="_black">Políticas de privacidad</a>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-login"></div>
    <div class="bg-login-color"></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      /* admin, password123; asesor, ajedrez32 */
      data: {
        username: '',
        password: ''
      },
      error: false,
      loader: false
    }
  },
  methods: {
    closeModal () {
    },
    login () {
      this.loader = true
      this.error = false
      this.$axios.post('auth/login/', this.data)
        .then(response => {
          this.$axios.defaults.headers.common['Authorization'] = 'JWT ' + response.data.token
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
          localStorage.setItem('document', response.data.user.document)
          localStorage.setItem('email', response.data.user.email)
          localStorage.setItem('first_name', response.data.user.first_name)
          localStorage.setItem('is_superuser', response.data.user.is_superuser)
          localStorage.setItem('last_name', response.data.user.last_name)
          localStorage.setItem('username', response.data.user.username)
          localStorage.setItem('token', response.data.token)
          this.$router.push({path: '/home'})
          /* alert(`Bienvenido "${this.data.username}"`) */
          /* this.getProfileData() */
        })
        .catch(err => {
          this.loader = false
          this.error = true
          console.log('AXIOS ERROR: ', err)
        })
    },
    getProfileData () {
      this.$axios
        .get('apis/profile/get_my_profile/')
        .then(response => {
          localStorage.setItem('avatar', response.data.profile.avatar)
          localStorage.setItem('profile_id', response.data.profile.id)
          localStorage.setItem('notepad', response.data.profile.notepad)
          localStorage.setItem('pilots', JSON.stringify(response.data.pilots))
          this.loader = false
          this.error = false
          this.$router.push({path: '/dashboard'})
          alert(`Bienvenido "${this.data.username}"`)
        })
    }
  },
  beforeCreate () {
    if (this.$libs.isAuthenticated()) {
      this.$router.push({path: '/home'})
    }
  }
}
</script>
