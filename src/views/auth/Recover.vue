<template>
  <div class="app flex-row align-items-center landing_page" lazy="loaded">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-form :hidden="enabledFormUpdatePassword">
            <b-card no-body class="mx-4">
              <b-card-body class="p-4">
                <h3>Cambiar contraseña</h3>
                <p class="text-muted">Escribe tu cuenta registrada</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-envelope"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="email" type="email" class="form-control" placeholder="Correo electrónico"
                    autocomplete="email_footprint" />
                </b-input-group>
              </b-card-body>
              <b-card-footer class="p-3">
                <b-row>
                  <b-col cols="6">
                    <div class="float-left">
                      <b-button block variant="link" to="login">
                        <span>Volver</span>
                      </b-button>
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <b-button block variant="success" type="button" @click="fnt_send_email_footprint">
                      <span>Enviar</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-footer>
            </b-card>
          </b-form>
          <b-form :hidden="!enabledFormUpdatePassword">
            <b-card no-body class="mx-4">
              <b-card-body class="p-4">
                <h3>Cambiar contraseña</h3>
                <p class="text-muted">Escribe tu nueva contraseña</p>
                <b-input-group class="mb-2">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="newPassword" type="password" class="form-control"
                    placeholder="Nueva contraseña" autocomplete="email_footprint" :state="fnt_validation_password" />
                </b-input-group>
                <p class="text-muted">Repetir contraseña</p>
                <b-input-group class="mb-2">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="confirmPassword" type="password" class="form-control"
                    placeholder="Repetir contraseña" autocomplete="email_footprint" :state="fnt_validation_password" />
                  <b-form-invalid-feedback :state="fnt_validation_password">
                    <i class="icon-close"></i>
                    {{messageFeedback}}
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="fnt_validation_password">
                    <i class="icon-check"></i> Las contraseñas coinciden.
                  </b-form-valid-feedback>
                </b-input-group>
              </b-card-body>
              <b-card-footer class="p-3">
                <b-row class="justify-content-center">
                  <b-col cols="6">
                    <b-button variant="link" @click="$router.push({name: 'Login'})" class="px-0">Iniciar sesión
                    </b-button>
                  </b-col>
                  <b-col cols="6">
                    <div class="float-right">
                      <b-button @click="fnt_update_password" variant="success">Cambiar contraseña</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-card-footer>
            </b-card>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_validation_password_rules,
    fnt_convert_email
  } from "@/shared/utils";
  export default {
    beforeCreate: function () {
      document.body.className = "recover";
    },
    mounted() {
      this.fnt_validated_code();
    },
    computed: {
      fnt_validation_password() {
        if (this.newPassword === "" && this.confirmPassword === "") {
          return null;
        } else {
          if (fnt_validation_password_rules(this.newPassword)) {
            if (this.newPassword === this.confirmPassword) {
              this.messageFeedback = "Las contraseñas coinciden.";
              return true;
            } else {
              this.messageFeedback = "Las contraseñas no coinciden.";
              return false;
            }
          } else {
            this.messageFeedback =
              "La nueva contraseña no cumple con las reglas, como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
            return false;
          }
        }
      }
    },
    data: () => {
      return {
        email: "",
        confirmPassword: "",
        newPassword: "",
        enabledFormUpdatePassword: false,
        messageFeedback: ""
      };
    },
    methods: {
      fnt_send_email_footprint: function () {
        if (this.email != "") {
          this.$store.state.isLoading = true;
          axios.post("recoverPassword", {
            email: fnt_convert_email(this.email)
          }).then(
            result => {
              this.$store.state.isLoading = false;
              fnt_toast(result.data, this.$bvToast);
              this.email = "";
            },
            error => {
              this.$store.state.isLoading = false;
              fnt_toast(error, this.$bvToast);
            }
          );
        } else {
          this.$store.state.isLoading = false;
          fnt_toast("Debe ingresar un correo valido", this.$bvToast);
        }
      },
      fnt_validated_code() {
        if (this.$route.params.id !== undefined) {
          axios.get(`recoverPassword/${this.$route.params.id}`).then(
            result => {
              if (result.data > 0) {
                if (parseInt(result.data)) {
                  this.enabledFormUpdatePassword = true;
                } else {
                  this.$router.push({
                    name: "Login"
                  });
                }
              } else {
                this.$router.push({
                  name: "Login"
                });
              }
            },
            error => {
              fnt_toast(error, this.$bvToast);
            }
          );
        } else {
          return false;
        }
      },
      fnt_update_password() {
        if (this.newPassword !== this.confirmPassword) {
          return;
        }
        axios
          .post("updatePassword", {
            code: this.$route.params.id,
            password: this.newPassword
          })
          .then(
            result => {
              if (result.data == "Contraseña actualizada correctamente") {
                this.newPassword = "";
                this.confirmPassword = "";
                this.$router.push({
                  name: "Login",
                  query: {
                    state: "changePassword"
                  }
                });
              } else {
                fnt_toast(result.data, this.$bvToast);
              }
            },
            error => {
              fnt_toast(error, this.$bvToast);
            }
          );
      }
    }
  }
</script>