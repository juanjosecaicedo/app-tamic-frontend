<template>
  <div class="app flex-row align-items-center landing_page" lazy="loaded">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h2>Bienvenido</h2>
                  <p class="text-muted">Ingresa a tu cuenta</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-envelope"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Correo electrónico"
                      autocomplete="email_footprint" v-model="email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Contraseña"
                      autocomplete="current-password" v-model="password" @keypress.enter="fnt_login" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" @keypress.enter="fnt_login" @click="fnt_login" class="px-4">Ingresar
                      </b-button>
                    </b-col>
                    <b-col cols="6" class="text-right d-none d-lg-block d-xl-block">
                      <b-button variant="link" class="px-0" to="recover">Cambiar contraseña</b-button>
                    </b-col>
                  </b-row><br>
                  <b-row>
                    <b-col cols="12" class="text-center mb-2 d-lg-none d-xl-none">
                      <b-button variant="link" class="px-0" to="recover">Cambiar contraseña</b-button>
                    </b-col>
                    <b-col cols="12" class="text-center d-lg-none d-xl-none">
                      No tienes una cuenta,
                      <b-link variant="link" class="px-0" @click="fnt_register">regístrate</b-link>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none">
              <b-card-body class="text-center">
                <div>
                  <h2>Unete a Tamic</h2>
                  <br />
                  <p>Plataforma con el mejor contenido de series, películas y canales de alta calidad</p>
                  <b-button variant="outline-light" @click="fnt_register" class="btn-lg btn-outline mt-3">¡Registrarse
                    ahora!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_convert_email
  } from "@/shared/utils";
  import AxiosPublic from "axios";
  import DeviceUUID from "device-uuid";
  export default {
    data: () => {
      return {
        email: "",
        password: "",
        id_empresa: "13b53dc5-f9b9-4275-bbf3-3617d09670ae",
        id_empleado: "1ed085ff-418d-4b5b-bc78-8d4c6bd17330",
        id_admin: "db2b9bdb-79c5-48d4-901c-09882a4db6eb",
        id_client: "c1a0761a-09a5-4cdd-b213-ec4639c55c06"
      };
    },
    created() {
      document.body.className = "login";
      if (localStorage.getItem("sessionData") != undefined) {
        if (JSON.parse(localStorage.sessionData).tbl_roles_role_id === this.id_client && JSON.parse(localStorage
            .sessionData).email != undefined) {
          this.$router.push({
            name: "Profiles",
            params: {
              isLogin: false
            }
          });
        } else {
          localStorage.clear();
          this.$router.push({
            name: "Login"
          });
        }
      }
    },
    mounted() {
      this.fnt_get_state();
    },
    methods: {
      fnt_login() {
        this.$store.state.isLoading = true;
        if (this.email == "" || this.password == "" || this.email == null || this.password == null || this.email ==
          undefined || this.password == undefined) {
          this.$store.state.isLoading = false;
          fnt_toast("Debe ingresar un correo y contraseña validos", this.$bvToast);
        } else {
          axios
            .post("login", {
              email: fnt_convert_email(this.email),
              password: this.password
            })
            .then(
              result => {
                if (result.data.status != "success") {
                  fnt_toast("Correo y/o clave incorrectos", this.$bvToast);
                } else {
                  localStorage.sessionData = JSON.stringify(result.data);
                  if (
                    result.data.tbl_roles_role_id === this.id_empleado ||
                    result.data.tbl_roles_role_id === this.id_admin
                  ) {
                    this.$router.push({
                      name: "Home"
                    });
                  } else if (result.data.tbl_roles_role_id === this.id_empleado) {
                    this.$router.push({
                      name: "Collaborator"
                    });
                  } else if (result.data.tbl_roles_role_id === this.id_empresa) {
                    this.$router.push({
                      name: "Analytics"
                    });
                  } else if (result.data.tbl_roles_role_id === this.id_client) {
                    this.$router.push({
                      name: "Profiles",
                      params: {
                        isLogin: true
                      }
                    });
                  }
                }
                this.$store.state.isLoading = false;
              },
              error => {
                this.$store.state.isLoading = false;
                fnt_toast(error, this.$bvToast);
              }
            );
        }
      },
      fnt_get_state() {
        if (this.$route.query.state == "aceptada") {
          fnt_toast("Pago registrado correctamente.", this.$bvToast);
        } else if (this.$route.query.state == "changePassword") {
          fnt_toast("La contraseña cambio correctamente.", this.$bvToast);
        }
      },
      fnt_register() {
        this.$store.state.subscription = true;
        this.$router.push({
          name: "Register"
        });
        this.$store.state.isLoading = false;
      }
    }
  }
</script>