<template>
  <div class="app flex-row align-items-center landing_page" lazy="loaded">
    <VueScriptComponent
      script="<script type='text/javascript' src='https://checkout.epayco.co/checkout.js'> </script>" />
    <div class="container">
      <div v-if="subscription == false">
        <b-row class="justify-content-center">
          <b-col md="8" class="d-md-none">
            <hooper :infiniteScroll="true">
              <slide :itemsToShow="2" v-for="(item, indx) in plans" :key="indx" :index="indx">
                <b-card no-body
                  :class="[item.dispositives > 3 && item.interval_count <= 30 ? 'text-white bg-primary' : item.dispositives > 3 && item.interval_count > 30 ? 'text-white bg-warning' : '']">
                  <b-card-body class="card-body justify-content-center">
                    <div class="text-center">
                      <h1 class="card-title">{{item.name}}</h1>
                      <br />
                      <h2>
                        <sup>$</sup>
                        {{fnt_format_price(item.value)}}
                        <small style="font-size: 19px">/ {{item.interval_count}}
                          {{fnt_get_interval(item.interval_type)}}</small>
                      </h2>
                    </div>
                    <br />
                    <hr class="mt-0" />
                    <br />
                    <ul class="fa-ul">
                      <div v-for="list in fnt_splited_list(item.description)" :key="list.id">
                        <li>
                          <i class="fa fa-check"></i>
                          {{list}}
                        </li>
                        <br />
                      </div>
                      <li class="fa fa-check" />
                      Dispositivos disponibles: {{item.dispositives}}
                      <br />
                    </ul>
                    <br />
                    <div align="center">
                      <b-col md="8">
                        <b-link
                          :class="[item.dispositives >= 3 ? 'btn btn-outline-light btn-block mt-3' : 'btn btn-outline-primary btn-block mt-3']"
                          @click="fnt_set_plan(item)">Empezar</b-link>
                      </b-col>
                    </div>
                  </b-card-body>
                </b-card>
              </slide>
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
          </b-col>
          <b-col md="9" class="d-md-down-none">
            <b-card-group>
              <b-card v-for="item in plans" :key="item.plan_id" no-body
                :class="[item.dispositives > 3 && item.interval_count <= 30 ? 'text-white bg-primary' : item.dispositives > 3 && item.interval_count > 30 ? 'text-white bg-warning' : '']">
                <b-card-body class="card-body justify-content-center">
                  <div class="text-center">
                    <h1 class="card-title">{{item.name}}</h1>
                    <br />
                    <h2>
                      <sup>$</sup>
                      {{fnt_format_price(item.value)}}
                      <small style="font-size: 19px">/ {{item.interval_count}}
                        {{fnt_get_interval(item.interval_type)}}</small>
                    </h2>
                  </div>
                  <br />
                  <hr class="mt-0" />
                  <br />
                  <ul class="fa-ul">
                    <div v-for="list in fnt_splited_list(item.description)" :key="list.id">
                      <li>
                        <i class="fa fa-check"></i>
                        {{list}}
                      </li>
                      <br />
                    </div>
                    <li class="fa fa-check" />
                    Dispositivos disponibles: {{item.dispositives}}
                    <br />
                  </ul>
                  <br />
                  <div align="center">
                    <b-col md="8">
                      <b-link
                        :class="[item.dispositives >= 3 ? 'btn btn-outline-light btn-block mt-3' : 'btn btn-outline-primary btn-block mt-3']"
                        @click="fnt_set_plan(item)">Empezar</b-link>
                    </b-col>
                  </div>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
      <div v-if="subscription">
        <b-row class="justify-content-center">
          <b-col md="6" lg="6" sm="12">
            <b-form @submit.prevent="fnt_add_user">
              <b-card no-body class="mx-4">
                <b-card-body class="p-4">
                  <h1>Registrarse</h1>
                  <p class="text-muted">Crea tu cuenta en un instante</p>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input :state="$v.name.$dirty ? !$v.name.$error : null" v-model="$v.name.$model" id="name"
                      type="text" placeholder="Nombres" autocomplete="name" required />
                    <b-form-input :state="$v.lastname.$dirty ? !$v.lastname.$error : null" v-model="$v.lastname.$model"
                      id="lastname" type="text" placeholder="Apellidos" autocomplete="lastname" required />
                    <b-tooltip target="name" :show="!$v.name.minLength">Mínimo {{$v.name.$params.minLength.min}}
                      caracteres</b-tooltip>
                    <b-tooltip target="lastname" :show="!$v.lastname.minLength">Mínimo
                      {{$v.lastname.$params.minLength.min}} caracteres</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-phone" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input :state="$v.phone.$dirty ? !$v.phone.$error : null" v-model="$v.phone.$model"
                      type="number" id="phone" placeholder="Teléfono" autocomplete="phone" required />
                    <b-tooltip target="phone" :show="!$v.phone.minLength">Mínimo {{$v.phone.$params.minLength.min}}
                      caracteres</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-envelope"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input :state="$v.email.$dirty ? !$v.email.$error : null" v-model="$v.email.$model"
                      type="email" id="email" placeholder="Correo electrónico" autocomplete="email"
                      onkeyup="javascript:this.value = this.value.toLowerCase();" required />
                    <b-tooltip target="email" :show="!$v.email.email">El campo debe ser un correo</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input :state="fnt_validation_password" v-model="$v.password.$model" type="password"
                      id="password" placeholder="Contraseña" required />
                    <b-tooltip target="password" :show="messageFeedbackPassword.show">
                      {{messageFeedbackPassword.message}}</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input :state="fnt_validation_password_and_equals" v-model="confirm_password" type="password"
                      id="confirm_password" placeholder="Repetir contraseña" required />
                    <b-tooltip target="confirm_password" :show="messageFeedbackConfirmPassword.show">
                      {{messageFeedbackConfirmPassword.message}}</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-symbol-male" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="gender" :state="$v.gender.$dirty ? !$v.gender.$error : null"
                      v-model="$v.gender.$model" required value-field="gender_id" text-field="name" :options="genders">
                      <option disabled value>Género</option>
                    </b-form-select>
                    <b-tooltip target="gender">Selecciona un elemento de la lista</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-flag" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="countries" @change="fnt_on_change"
                      :state="$v.tbl_countries_country_id.$dirty ? !$v.tbl_countries_country_id.$error : null"
                      v-model="$v.tbl_countries_country_id.$model" required value-field="country_id" text-field="name"
                      :options="countries">
                      <option disabled value>País</option>
                    </b-form-select>
                    <b-form-select id="cities"
                      :state="$v.tbl_cities_city_id.$dirty ? !$v.tbl_cities_city_id.$error : null"
                      v-model="$v.tbl_cities_city_id.$model" :options="cities" value-field="city_id" text-field="name"
                      required>
                      <option disabled value>Ciudad</option>
                    </b-form-select>
                    <b-tooltip target="countries">Selecciona un elemento de la lista</b-tooltip>
                    <b-tooltip target="cities">Selecciona un elemento de la lista</b-tooltip>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="cui-tags" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="tbl_codes_code_id" type="text" id="code"
                      onkeyup="javascript:this.value=this.value.toUpperCase();" placeholder="Código promocional">
                    </b-form-input>
                    <b-tooltip target="code">Campo opcional</b-tooltip>
                  </b-input-group>
                  <b-form-checkbox v-model="terms" value="true" unchecked-value="false" required class="mb-4">
                    He leído y acepto los
                    <b-link v-b-modal.modal-terms>Términos y Condiciones</b-link>
                  </b-form-checkbox>
                  <div>
                    <b-modal hide-backdrop content-class="shadow" scrollable id="modal-terms" size="lg"
                      cancel-title="Cancelar" ok-title="Aceptar" @ok="terms = true" title="Términos y Condiciones">
                      <DefaultTerms />
                    </b-modal>
                  </div>
                  <b-button type="submit" variant="success" block>Crear cuenta</b-button>
                </b-card-body>
                <b-card-footer class="p-3">
                  <b-row>
                    <b-col cols="6">
                      <b-button block class="btn btn-facebook" to="subscription">
                        <span>Planes</span>
                      </b-button>
                    </b-col>
                    <b-col cols="6">
                      <b-button block class="btn btn-twitter" to="login" type="button">
                        <span>Ingresar</span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card-footer>
              </b-card>
            </b-form>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_format_price,
    fnt_get_interval,
    fnt_splited_list,
    fnt_validation_password_rules,
    fnt_convert_email
  } from "@/shared/utils";
  import VueScriptComponent from "vue-script-component";
  import {
    minLength,
    maxLength,
    email,
    numeric
  } from "vuelidate/lib/validators";
  import DefaultTerms from "../streaming/containers/DefaultTerms";
  export default {    
    beforeCreate: function () {
      document.body.className = "register";
    },
    mounted() {
      this.fnt_validate_plan();
      this.fnt_get_types();
    },
    components: {
      VueScriptComponent,
      DefaultTerms
    },
    computed: {
      fnt_validation_password() {
        if (this.password.trim() === "") {
          this.messageFeedbackPassword.show = false;
          this.messageFeedbackPassword.message =
            "La contraseña como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
          return null;
        } else {
          if (fnt_validation_password_rules(this.password.trim())) {
            this.messageFeedbackPassword.show = true;
            this.messageFeedbackPassword.message = "La contraseña cumple con la condiciones.";
            return true;
          } else {
            this.messageFeedbackPassword.show = true;
            this.messageFeedbackPassword.message =
              "La contraseña como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
            return false;
          }
        }
      },
      fnt_validation_password_and_equals() {
        if (this.password.trim() === "") {
          this.messageFeedbackConfirmPassword.show = false;
          this.messageFeedbackConfirmPassword.message =
            "Escribe la contraseña para validar la confirmación de contraseña, sea correcta.";
          return null;
        } else {
          if (fnt_validation_password_rules(this.password.trim())) {
            if (this.password.trim() !== "" && this.confirm_password.trim() !== "") {
              if (this.confirm_password === this.password) {
                this.messageFeedbackConfirmPassword.show = true;
                this.messageFeedbackConfirmPassword.message = "La confirmación de contraseña es correcta.";
                return true;
              } else {
                this.messageFeedbackConfirmPassword.show = true;
                this.messageFeedbackConfirmPassword.message = "La confirmación de contraseña esta mal escrita.";
                return false;
              }
            }
          } else {
            this.messageFeedbackConfirmPassword.show = true;
            this.messageFeedbackPassword.message =
              "La contraseña como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
            return false;
          }
        }
      },
      fnt_validation_password_and_equals(){
        if (this.password.trim() === ""){
            this.messageFeedbackConfirmPassword.show = false;
            this.messageFeedbackConfirmPassword.message = "Escribe la contraseña para validar la confirmación de contraseña, sea correcta.";
          return null;
        } else {
            if (fnt_validation_password_rules(this.password.trim())) {
                if (this.password.trim() !== "" && this.confirm_password.trim() !== "") {
                    if(this.confirm_password === this.password){
                        this.messageFeedbackConfirmPassword.show = true;
                        this.messageFeedbackConfirmPassword.message = "La confirmación de contraseña es correcta.";
                        return true;
                    }else{
                        this.messageFeedbackConfirmPassword.show = true;
                        this.messageFeedbackConfirmPassword.message = "La confirmación de contraseña esta mal escrita.";
                        return false;
                    }
                }
            } else {
                this.messageFeedbackConfirmPassword.show = true;
                this.messageFeedbackPassword.message = "La contraseña como minimo debe contener: un numero, una minuscula, una mayuscula y debe ser mayor a 8 caracteres maximo 16 caracteres.";
                return false;
            }
        }
      },
      subscription() {
        return this.$store.state.subscription;
      }
    },
    data: () => {
      return {
        messageFeedbackPassword: {
          show: false,
          message: ""
        },
        messageFeedbackConfirmPassword: {
          show: false,
          message: ""
        },
        countries: [],
        cities: [],
        codes: [],
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        lastname: "",
        phone: "",
        tbl_cities_city_id: "",
        tbl_countries_country_id: "",
        tbl_codes_code_id: "",
        terms: false,
        data: null,
        genders: [{
            gender_id: "Masculino",
            name: "Masculino"
          },
          {
            gender_id: "Femenino",
            name: "Femenino"
          },
          {
            gender_id: "Indefinido",
            name: "Indefinido"
          }
        ],
        gender: "",
        response: false,
        plans: [],
        plan_id: ""
      };
    },
    validations: {
      email: {
        email: email,
        minLength: minLength(4)
      },
      password: {
        minLength: minLength(8)
      },
      name: {
        minLength: minLength(4)
      },
      lastname: {
        minLength: minLength(4)
      },
      phone: {
        numeric: numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      tbl_cities_city_id: {
        minLength: minLength(4)
      },
      tbl_countries_country_id: {
        minLength: minLength(4)
      },
      gender: {
        minLength: minLength(4)
      }
    },
    methods: {
      fnt_get_types() {
        Promise.all([axios.get("country"), axios.get("city"), axios.get("plan/active")]).then(
          ([resultCountry, resultCity, resultPlan]) => {
            this.countries = resultCountry.data;
            this.cities = resultCity.data;
            this.plans = resultPlan.data;
          }
        );
      },
      fnt_on_change() {
        axios.get("city/" + this.tbl_countries_country_id).then(
          result => {
            this.cities = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_add_user(event) {
        event.preventDefault();
        if (this.$v.$invalid) {
          this.$v.$touch();
          this.submitStatus = "ERROR";
        } else {
          if (this.terms) {
            this.$v.$reset();
            if (this.fnt_validate_fields()) {
              this.$store.state.isLoading = true;
              axios
                .get("validate/email/" + fnt_convert_email(this.email)).then(result => {
                  if (result.data[0].validate < 1) {
                    axios
                      .post("people", {
                        name: this.name,
                        lastname: this.lastname,
                        phone: this.phone,
                        language: "Español",
                        gender: this.gender,
                        tbl_cities_city_id: this.tbl_cities_city_id,
                        email: fnt_convert_email(this.email),
                        key_code: this.tbl_codes_code_id,
                        password: this.password,
                        tbl_types_type_id: "6e643417-b945-4021-b531-037217f26d62",
                        tbl_roles_role_id: "c1a0761a-09a5-4cdd-b213-ec4639c55c06"
                      })
                      .then(result => {
                        // console.log(result.data);
                        if (
                          result.data.length < 1 ||
                          result.data == "Ingresar todos los datos"
                        ) {
                          fnt_toast(result.data, this.$bvToast);
                          this.$store.state.isLoading = false;
                        } else if (this.tbl_codes_code_id != "") {
                          // console.log(this.tbl_codes_code_id)
                          axios.get("validate/code/" + this.tbl_codes_code_id).then(
                            resultCodes => {
                              // console.log(resultCodes.data)
                              for (const i in resultCodes.data) {
                                this.codes = resultCodes.data[i];
                              }
                              // console.log(this.codes)
                              this.$store.state.isLoading = false;
                              if (this.codes.length < 1) {
                                fnt_toast("El código no esta disponible", this.$bvToast);
                              } else {
                                fnt_toast(
                                  "Cuenta registrada correctamente",
                                  this.$bvToast
                                );
                                this.fnt_update_key(this.codes.code_id, result.data);
                                this.$route.params.name = this.codes.plan_name;
                                this.$route.params.plan_id = this.codes.plan_id;
                                this.$route.params.value =
                                  this.codes.plan_value -
                                  this.codes.plan_value * (this.codes.discount / 100);
                                this.$route.params.code = this.codes.code_id;
                                switch (this.codes.short_name) {
                                  case "CT":
                                    let city = "Cali";
                                    for (const i in this.cities) {
                                      if (
                                        this.tbl_cities_city_id == this.cities[i].city_id
                                      ) {
                                        city = this.cities[i].name;
                                        break;
                                      }
                                    }
                                    axios
                                      .post("payment", {
                                        x_id_factura: null,
                                        x_id_invoice: null,
                                        x_description: this.codes.plan_name,
                                        x_amount: this.codes.plan_value,
                                        x_amount_country: this.codes.plan_value,
                                        x_amount_ok: this.codes.plan_value,
                                        x_tax: "0",
                                        x_amount_base: "0",
                                        x_currency_code: "COP",
                                        x_respuesta: "Aceptada",
                                        x_response: "Aceptada",
                                        x_business: "Tamic",
                                        x_bank_name: "Tarjeta",
                                        x_customer_name: this.name,
                                        x_customer_lastname: this.lastname,
                                        x_customer_email: fnt_convert_email(this.email),
                                        x_customer_phone: this.phone,
                                        x_customer_movil: this.phone,
                                        x_customer_ind_pais: 57,
                                        x_customer_country: "CO",
                                        x_customer_city: city,
                                        x_extra1: this.codes.plan_id,
                                        x_extra2: result.data,
                                        x_extra3: this.codes.code_id
                                      })
                                      .then(res => {
                                        if (res.data == "Ok") {
                                          this.$router.push({
                                            name: "Login"
                                          });
                                        } else {
                                          this.$router.push({
                                            name: "Register"
                                          });
                                        }
                                      });
                                    this.fnt_clear_form();
                                    break;
                                  case "CI":
                                    this.fnt_update_key(this.codes.code_id, result.data);
                                    this.fnt_open_epayco(result.data);
                                    break;
                                  default:
                                    fnt_toast(
                                      "El código no esta disponible",
                                      this.$bvToast
                                    );
                                    break;
                                }
                              }

                            }
                          );
                        } else if (this.tbl_codes_code_id == "") {
                          this.$store.state.isLoading = false;
                          fnt_toast(
                            "Cuenta registrada, esperando confirmación de pago",
                            this.$bvToast
                          );
                          if (this.$route.params.name != null &&
                            this.$route.params.value != null &&
                            this.$route.params.plan_id != null
                          ) {
                            this.fnt_open_epayco(result.data);
                          } else {
                            this.$store.state.subscription = false;
                            this.$store.state.data = result.data;
                          }
                        }
                      })
                      .catch(error => {
                        fnt_toast(error, this.$bvToast);
                      });

                  } else {
                    this.$store.state.isLoading = false;
                    fnt_toast("El correo ya se encuentra registrado", this.$bvToast);
                  }
                })
            } else {
              this.$store.state.isLoading = false;
              fnt_toast("Ingresar todos los datos", this.$bvToast);
            }
          } else {
            this.$store.state.isLoading = false;
            fnt_toast("Aceptar los Términos y Condiciones", this.$bvToast);
          }
        }
      },
      fnt_clear_form() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.lastname = "";
        this.phone = "";
        this.tbl_cities_city_id = "";
        this.tbl_countries_country_id = "";
        this.tbl_roles_role_id = "";
        this.terms = false;
        this.tbl_codes_code_id = "";
        this.codes = null;
        this.gender = "";
      },
      fnt_open_epayco(user_id) {
        if (this.$route.params.plan_id == null) {
          this.$router.push({
            name: "Subscription"
          });
        } else {
          if (user_id.includes("Error")) {
            fnt_toast(user_id, this.$bvToast);
          } else {
            axios.get("invoice").then(res => {
              this.data = {
                name: this.$route.params.name,
                description: this.$route.params.name,
                invoice: res.data[0].invoice,
                // tax_base: plan.value - plan.value * 0.19,
                // tax: plan.value * 0.19,
                currency: "cop",
                amount: this.$route.params.value,
                country: "co",
                lang: "es",
                external: "false",
                extra1: this.$route.params.plan_id,
                extra2: user_id,
                extra3: this.$route.params.code,
                confirmation: process.env.VUE_APP_ROOT_API + "billing",
                response: process.env.VUE_APP_ROOT_API + "billing",
                name_billing: this.name + " " + this.lastname,
                email_billing: fnt_convert_email(this.email),
                mobilephone_billing: this.phone
              };
              var handler = ePayco.checkout.configure({
                key: process.env.VUE_APP_EPAYCO_API_KEY,
                test: false
              });
              handler.open(this.data);
              this.fnt_clear_form();
              this.$store.state.subscription = true;
            })
          }
        }
      },
      fnt_validate_plan() {
        if (this.$route.query.code != null) {
          this.tbl_codes_code_id = this.$route.query.code;
        }
      },
      fnt_set_plan(plan) {
        this.$route.params.name = plan.name;
        this.$route.params.value = plan.value;
        this.$route.params.plan_id = plan.plan_id;
        if (this.$store.state.data != null) {
          this.fnt_open_epayco(this.$store.state.data);
        }
      },
      fnt_update_key(key_code, user_id) {
        axios.post("key/" + user_id, {
          key_code: key_code
        })
      },
      fnt_validate_fields() {
        if (this.name == "" ||
          this.lastname == "" ||
          this.phone == "" ||
          this.gender == "" ||
          this.tbl_cities_city_id == "" ||
          this.email == "" ||
          this.password == "") {
          return false;
        } else {
          return true;
        }
      },
      fnt_format_price,
      fnt_splited_list,
      fnt_get_interval
    }
  };
</script>
