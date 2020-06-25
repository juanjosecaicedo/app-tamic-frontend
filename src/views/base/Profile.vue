<template>
  <div class="wrapper text-muted">
    <div class="animated fadeIn">
      <b-row>
        <b-col sm="12" lg="3">
          <b-card class="mb-1">
            <div class="text-center">
              <img class="card-image mb-2" v-lazy="fnt_img()" img-top />
              <b-card-title :title="fnt_profile()" />
            </div>
            <b-card-text>
              <div class="text-muted mb-2">
                <span class="icon-location-pin"></span>
                {{city}}
                <br />
                <span class="icon-phone"></span>
                {{phone}}
              </div>
              <b-link @click="isChangePassword = false">Información</b-link><br>
              <b-link @click="isChangePassword = true">Cambiar contraseña</b-link>
              <br>
              <div v-if="$route.name == 'Setting' && fnt_active_service()">
                <b-link :to="{name:'Profiles'}">Administrar perfiles</b-link>
                <br />
                <b-link v-b-modal.modal>Control parental</b-link>
                <br>
                <b-modal id="modal" title="Control parental">
                  <b-form-group label="Introduce la contraseña de tu cuenta para configurar el control parental">
                    <b-form-input v-model="confirm_password" type="password" required />
                  </b-form-group>
                  <template v-slot:modal-footer>
                    <b-button variant="primary" @click="fnt_validate_password">Continuar</b-button>
                    <b-button variant="light" @click="$bvModal.hide('modal')">Cancelar</b-button>
                  </template>
                </b-modal>
                <b-modal id="modal-parental" title="Control parental">
                  <b-form-group class="my-1 mb-3" label="PIN de cuatro (4) dígitos"
                    description="Puedes usar tu PIN para restringir la reproducción de ciertas categorías especificadas a continuación">
                    <b-input-group class="mb-3">
                      <input placeholder="0" v-model="digit1" class="form-control digit" type="text" maxlength="1"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
                      <input placeholder="0" v-model="digit2" class="form-control digit" type="text" maxlength="1"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
                      <input placeholder="0" v-model="digit3" class="form-control digit" type="text" maxlength="1"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
                      <input placeholder="0" v-model="digit4" class="form-control digit" type="text" maxlength="1"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
                    </b-input-group>
                  </b-form-group>
                  <b-form-group class="mb-3" label="Categorías">
                    <multiselect v-model="select_categories" :options="categories" :multiple="true"
                      :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                      placeholder="Seleccionar" label="name" track-by="name" :preselect-first="false">
                      <template slot="selection" slot-scope="{ values, search, isOpen }">
                        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }}
                          categorías</span>
                      </template>
                    </multiselect>
                  </b-form-group>
                  <template v-slot:modal-footer>
                    <b-button variant="primary" type="submit" @click="fnt_parental_control('save')">Guardar</b-button>
                    <b-button variant="danger" @click="fnt_parental_control('delete')">Desactivar</b-button>
                  </template>
                </b-modal>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col sm="12" lg="9" v-if="isChangePassword == false">
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <b>Información</b>
              <div class="card-header-actions d-md-none">
                <b-button v-b-tooltip.hover title="Editar" variant="outline-primary" size="sm" @click="fnt_update_user">
                  <i class="fa fa-pencil" />
                </b-button>
              </div>
            </div>
            <b-form @submit.prevent="fnt_update_user">
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Nombres">
                    <b-form-input v-model="name" type="text" autocomplete="name" />
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Apellidos">
                    <b-form-input v-model="lastname" type="text" autocomplete="lastname" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Identificación">
                    <b-form-input v-model="identification" type="number" autocomplete="identification" />
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Documento">
                    <select v-model="tbl_types_type_id" name="types" id="types" class="form-control">
                      <option disabled value>Seleccionar</option>
                      <option v-for="type in types" :key="type.type_id" :value="type.type_id">{{ type.name }}</option>
                    </select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Teléfono">
                    <b-form-input v-model="phone" type="number" autocomplete="contact-phone" />
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Dirección">
                    <b-form-input v-model="address" type="text" autocomplete="address" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Correo">
                    <b-form-input v-model="email" type="email" />
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Genero">
                    <select v-model="gender" class="form-control">
                      <option disabled value>Seleccionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Indefinido">Indefinido</option>
                    </select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="País">
                    <select v-model="tbl_countries_country_id" @change="fnt_on_change($event)" class="form-control">
                      <option disabled value>Seleccionar</option>
                      <option v-for="country in countries" :key="country.country_id" :value="country.country_id">
                        {{ country.name }}</option>
                    </select>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Ciudad">
                    <select v-model="tbl_cities_city_id" class="form-control">
                      <option disabled value>Seleccionar</option>
                      <option v-for="city in cities" :key="city.city_id" :value="city.city_id">{{ city.name }}</option>
                    </select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Idioma">
                    <select v-model="language" class="form-control">
                      <option disabled value>Seleccionar</option>
                      <option value="Español">Español</option>
                      <option value="Inglés">Inglés</option>
                    </select>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Fecha de nacimiento">
                    <date-picker input-class="form-control" v-model="date_birth" lang="es" format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"></date-picker>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="form-actions">
                <b-row>
                  <b-col lg="3" sm="6">
                    <b-button variant="primary" block type="submit">Editar</b-button>
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </b-card>
          <br />
        </b-col>
        <b-col sm="12" lg="6" v-if="isChangePassword == true">
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <b>Cambiar contraseña</b>
              <div class="card-header-actions d-md-none">
                <b-button v-b-tooltip.hover title="Editar" variant="outline-primary" size="sm"
                  @click="fnt_change_password">
                  <i class="fa fa-pencil" />
                </b-button>
              </div>
            </div>
            <b-form @submit.prevent="fnt_change_password">
              <b-col sm="12">
                <b-form-group label="Contraseña actual">
                  <b-form-input v-model="current_password" type="password" class="form-control" required />
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group label="Nueva contraseña">
                  <b-form-input v-model="new_password" type="password" class="form-control" required
                    :state="fnt_validation_password" />
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group label="Repetir contraseña">
                  <b-form-input v-model="repeat_password" type="password" class="form-control" required
                    :state="fnt_validation_password" />
                  <b-form-invalid-feedback :state="fnt_validation_password">
                    <i class="icon-close"></i>
                    {{message_feedback}}
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="fnt_validation_password">
                    <i class="icon-check"></i> Las contraseñas coinciden
                  </b-form-valid-feedback>
                </b-form-group>
              </b-col>
              <div class="form-actions">
                <b-row>
                  <b-col lg="3" sm="6" xl="3">
                    <b-button variant="primary" block type="submit">Editar</b-button>
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_convert_email,
    fnt_validation_password_rules
  } from "@/shared/utils";
  import DatePicker from "vue2-datepicker";
  const sha256 = require("sha256");

  export default {
    mounted() {
      this.fnt_get_types();
      this.fnt_validate_session();
    },
    components: {
      DatePicker
    },
    data: () => {
      return {
        countries: [],
        cities: [],
        types: [],
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        lastname: "",
        identification: "",
        tbl_types_type_id: "",
        phone: "",
        address: "",
        language: "",
        date_birth: "",
        gender: "",
        tbl_cities_city_id: "",
        tbl_countries_country_id: "",
        tbl_roles_role_id: "",
        user_id: "",
        city: "",
        role: "",
        categories: [],
        select_categories: null,
        digit1: null,
        digit2: null,
        digit3: null,
        digit4: null,
        isChangePassword: false,
        current_password: '',
        new_password: '',
        repeat_password: '',
        message_feedback: ''
      };
    },
    computed: {
      fnt_validation_password() {
        if (this.new_password === "" && this.repeat_password === "") {
          return null;
        } else {
          if (fnt_validation_password_rules(this.new_password)) {
            if (this.new_password === this.repeat_password) {
              this.message_feedback = "Las contraseñas coinciden";
              return true;
            } else {
              this.message_feedback = "Las contraseñas no coinciden";
              return false;
            }
          } else {
            this.message_feedback =
              "La nueva contraseña no cumple con las reglas, como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
            return false;
          }
        }
      }
    },
    methods: {
      fnt_update_user() {
        var data = JSON.parse(localStorage.sessionData);
        data.email_footprint = sha256(fnt_convert_email(this.email));
        localStorage.setItem("sessionData", JSON.stringify(data));
        this.$store.state.isLoading = true;
        axios
          .put("people/" + this.people_id, {
            email: fnt_convert_email(this.email),
            password: this.password,
            name: this.name,
            lastname: this.lastname,
            identification: this.identification,
            tbl_types_type_id: this.tbl_types_type_id,
            phone: this.phone,
            address: this.address,
            language: this.language,
            date_birth: this.date_birth,
            gender: this.gender,
            tbl_cities_city_id: this.tbl_cities_city_id,
            tbl_countries_country_id: this.tbl_countries_country_id,
            tbl_roles_role_id: this.tbl_roles_role_id,
            user_id: this.user_id
          })
          .then(res => {
            this.$store.state.isLoading = false;
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            this.$store.state.isLoading = false;
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_img() {
        if (localStorage.profile != null) {
          return 'img/avatars/' + JSON.parse(localStorage.profile).img;
        } else {
          return "bg.svg";
        }
      },
      async fnt_get_types() {
        await Promise.all([
          axios.get("country"),
          axios.get("city"),
          axios.get("types"),
          axios.get("category")
        ]).then(([resultCountry, resultCity, resultType, resultCategory]) => {
          this.countries = resultCountry.data;
          this.cities = resultCity.data;
          this.types = resultType.data.filter(item => item.value == "1");
          this.categories = resultCategory.data;
        });
      },
      fnt_validate_session() {
        let array = [];
        this.name = JSON.parse(localStorage.sessionData).name;
        this.lastname = JSON.parse(localStorage.sessionData).lastname;
        this.phone = JSON.parse(localStorage.sessionData).phone;
        this.city = JSON.parse(localStorage.sessionData).city;
        this.language = JSON.parse(localStorage.sessionData).language;
        this.email = JSON.parse(localStorage.sessionData).email;

        if (localStorage.sessionData != null) {
          Promise.all([
            axios.get(
              "people/" + JSON.parse(localStorage.sessionData).email_footprint
            )
          ]).then(([resultPeople]) => {
            array = resultPeople.data;
            for (const i in array) {
              // this.email = array[i].email;
              this.password = array[i].password;
              // this.name = array[i].name;
              // this.lastname = array[i].lastname;
              this.identification = array[i].identification;
              this.tbl_types_type_id = array[i].type_id;
              // this.phone = array[i].phone;
              this.address = array[i].address;
              // this.language = array[i].language;
              this.date_birth = array[i].date_birth;
              this.gender = array[i].gender;
              this.tbl_cities_city_id = array[i].city_id;
              this.tbl_countries_country_id = array[i].country_id;
              this.fnt_update_cities(array[i].country_id);
              this.tbl_roles_role_id = array[i].role_id;
              this.user_id = array[i].user_id;
              this.people_id = array[i].people_id;
              // this.city = array[i].city;
              this.role = array[i].role;
            }
          });
        } else {
          fnt_toast("Error en la sesión", this.$bvToast);
        }
      },
      fnt_on_change(event) {
        axios.get("city/" + event.target.value).then(
          result => {
            this.cities = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_active_service() {
        if (JSON.parse(localStorage.sessionData).activeServices > 0) {
          return true;
        } else {
          return false;
        }
      },
      fnt_update_cities(country) {
        axios.get("city/" + country).then(
          result => {
            this.cities = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_parental_control(type) {
        if (
          this.fnt_validate(this.digit1) &&
          this.fnt_validate(this.digit2) &&
          this.fnt_validate(this.digit3) &&
          this.fnt_validate(this.digit4)
        ) {
          if (
            (type == "save" && this.select_categories != null) ||
            type == "delete"
          ) {
            let session = JSON.parse(localStorage.getItem("sessionData"));
            if (type == "save") {
              session.control = true;
            } else if (type == "delete") {
              session.control = false;
            }
            localStorage['sessionData'] = JSON.stringify(session);
            let pin = "";
            let category = [];
            for (const i in this.select_categories) {
              category.push(this.select_categories[i].category_id);
            }
            axios
              .post("parental/control", {
                email: JSON.parse(localStorage.sessionData).email_footprint,
                pin: pin.concat(
                  this.digit1,
                  this.digit2,
                  this.digit3,
                  this.digit4
                ),
                categories: category.join(","),
                type: type
              })
              .then(
                result => {
                  if (result.data[0][0].status) {
                    this.$bvModal.hide("modal-parental");
                    if (type == "save") {
                      fnt_toast("PIN guardado exitosamente", this.$bvToast);
                    } else {
                      fnt_toast("PIN desactivado exitosamente", this.$bvToast);
                    }
                  } else {
                    fnt_toast("Error en el PIN ingresado", this.$bvToast);
                  }
                },
                error => {
                  fnt_toast(error, this.$bvToast);
                }
              );
          } else {
            fnt_toast("Error en el PIN ingresado", this.$bvToast);
          }
        } else {
          fnt_toast("Error en el PIN ingresado", this.$bvToast);
        }
        this.select_categories = null;
        this.digit1 = 0;
        this.digit2 = 0;
        this.digit3 = 0;
        this.digit4 = 0;
      },
      fnt_validate(value) {
        if (value >= 0 && value <= 9) {
          return true;
        } else {
          return false;
        }
      },
      fnt_validate_password() {
        if (
          this.confirm_password != null &&
          this.confirm_password != "" &&
          this.confirm_password != undefined
        ) {
          axios
            .post("validate/user", {
              email_footprint: JSON.parse(localStorage.sessionData)
                .email_footprint,
              password: this.confirm_password
            })
            .then(result => {
              if (result.data[0].count >= 1) {
                this.$bvModal.hide("modal");
                axios
                  .post("get/pin", {
                    email: JSON.parse(localStorage.sessionData).email_footprint
                  })
                  .then(result => {
                    let array = result.data;
                    let pin = [];
                    this.select_categories = [];
                    for (const i in array) {
                      pin = array[i].pin.split("");
                      this.select_categories.push({
                        category_id: array[i].tbl_categories_category_id,
                        name: array[i].name
                      });
                    }
                    this.digit1 = pin[0];
                    this.digit2 = pin[1];
                    this.digit3 = pin[2];
                    this.digit4 = pin[3];
                  });
                this.$bvModal.show("modal-parental");
              } else {
                fnt_toast("La clave es incorrecta", this.$bvToast);
              }
            });
        } else {
          fnt_toast("Debe ingresar toda la información", this.$bvToast);
        }
        this.confirm_password = null;
      },
      fnt_profile() {
        if (localStorage.profile != null) {
          return JSON.parse(localStorage.profile).name;
        } else {
          return this.name;
        }
      },
      fnt_change_password() {
        if (
          this.current_password != "" &&
          this.new_password != "" &&
          this.repeat_password != ""
        ) {
          if (this.new_password == this.repeat_password) {
            this.$store.state.isLoading = true;
            axios.post("validate/user", {
              email_footprint: JSON.parse(localStorage.sessionData).email_footprint,
              password: this.current_password
            }).then(result => {
              if (result.data[0].count >= 1) {
                this.$store.state.isLoading = false;
                axios.post("change/password", {
                  email_footprint: JSON.parse(localStorage.sessionData).email_footprint,
                  password: this.new_password
                }).then(result => {
                  this.current_password = "";
                  this.new_password = "";
                  this.repeat_password = "";
                  fnt_toast(result.data, this.$bvToast);
                })
              } else {
                this.$store.state.isLoading = false;
                fnt_toast("La contraseña actual es incorrecta", this.$bvToast);
              }
            })
          } else {
            fnt_toast("Las contraseñas no coinciden", this.$bvToast);
          }
        } else {
          fnt_toast("Debe ingresar toda la información", this.$bvToast);
        }
      }
    }
  };
</script>

