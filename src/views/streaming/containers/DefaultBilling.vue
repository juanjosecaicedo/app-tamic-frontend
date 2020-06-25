<template>
  <div class="text-muted">
    <VueScriptComponent
      script="<script type='text/javascript' src='https://checkout.epayco.co/checkout.js'> </script>" />
    <b-col lg="12">
      <b-card v-if="isRecurring">
        <div slot="header">
          <strong>Tarjeta de crédito</strong>
        </div>
        <form @submit.prevent="fnt_recurring_payment">
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="name">Nombre</label>
                <b-form-input v-model="name" type="text" id="name" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Identificación">
                <b-form-input v-model="identification" type="number" autocomplete="identification" required />
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Documento">
                <select v-model="tbl_types_type_id" name="types" id="types" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option v-for="type in types" :key="type.type_id" :value="type.short_name">{{ type.name }}</option>
                </select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Número de tarjeta</label>
                <b-form-input v-model="number" type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="month1">Mes</label>
                <b-form-select v-model="exp_month" id="month1" :plain="true"
                  :options="['01','02','03','04','05','06','07','08','09','10','11','12']" required></b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="year1">Año</label>
                <b-form-select v-model="exp_year" id="year1" :plain="true"
                  :options="['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']"
                  required></b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="cvv">CVC</label>
                <b-form-input v-model="cvc" type="text" id="cvv" placeholder="123" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="form-actions">
            <b-row>
              <b-col lg="6" sm="6">
                <h6 class="mb-3">
                  Plan elegido: {{selectedPlan.name}} -
                  <sup>$</sup>
                  {{fnt_format_price(selectedPlan.value)}}
                  <small>/ {{selectedPlan.interval_count}} {{fnt_get_interval(selectedPlan.interval_type)}}</small>
                </h6>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3" sm="6">
                <b-button variant="outline-success" block type="submit">
                  <i class="cui-dollar"></i>&nbsp; Pagar ahora
                </b-button>
              </b-col>
            </b-row>
          </div>
        </form>
      </b-card>
    </b-col>
    <b-col lg="12">
      <transition name="fade">
        <div v-if="!show">
          <div class="mb-5">
            <div v-if="back" class="float-right">
              <b-button variant="outline-dark" block v-on:click="show = !show, isRecurring = false">
                <li class="fa fa-angle-left" />&nbsp;
                Regresar
              </b-button>
            </div>
            <h4>Elegir un plan</h4>
          </div>
          <div class="mb-6">
            <b-list-group horizontal="md" class="mb-4">
              <b-list-group-item href="#"
                :class="[item.dispositives > 3  && item.interval_count <= 30 ? 'flex-column align-items-start bg-primary' : item.dispositives > 3 && item.interval_count > 30 ? 'flex-column align-items-start bg-warning' : 'flex-column align-items-start']"
                v-for="(item,indx) in plans" :key="`A-${indx}`" @click="fnt_payment(item)">
                <div class="text-center">
                  <h5 class="mb-3">{{item.name}}</h5>
                  <br />
                  <h5 class="mb-3">
                    <sup>$</sup>
                    {{fnt_format_price(item.value)}}
                    <small>/ {{item.interval_count}} {{fnt_get_interval(item.interval_type)}}</small>
                  </h5>
                  <hr>
                </div>
                <br />
                <ul class="fa-ul">
                  <div v-for="(list,indx) in fnt_splited_list(item.description)" :key="`B-${indx}`">
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
                <b-badge variant="dark" pill>{{fnt_plan(item.tbl_types_type_id)}}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </transition>
    </b-col>
    <b-col lg="12">
      <transition name="fade">
        <b-card no-body v-if="show">
          <div slot="header">
            <strong>Facturación</strong>
          </div>
          <b-card-body>
            <div v-for="(item, indx) in items" :key="`C-${indx}`">
              <div v-if="item.state == true">
                <b-row>
                  <b-col lg="6">
                    <p>
                      Plan
                      <b>{{item.name}}</b>
                      por ${{fnt_format_price(item.x_amount)}} / mes
                      <br />
                      {{item.dispositives}} dispositivos en contenido HD
                    </p>
                  </b-col>
                  <b-col lg="6">
                    <p>
                      <b>Proxima factura</b>
                      <br />
                      {{item.end_date | formatDate}}
                    </p>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div class="form-actions">
              <b-row>
                <b-col lg="3" sm="6">
                  <b-button variant="outline-success" block v-on:click="show = !show, paymentType = 'Epayco'">
                    <i class="cui-dollar"></i>&nbsp;Otros medios de pago
                  </b-button>
                </b-col>
                <b-col lg="3" sm="6">
                  <b-button
                    v-b-popover.hover.top="'Son cobros automatizados que se realizan periódicamente (mensual, anual)'"
                    title="¿Como funciona?" block variant="outline-primary"
                    v-on:click="show = !show, paymentType = 'Recurring'">
                    <i class="icon-rocket"></i>&nbsp;Tarjeta de crédito
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </transition>
    </b-col>
    <b-col lg="12">
      <transition name="fade">
        <b-card no-body v-if="show">
          <div slot="header">
            <strong>Código promocional</strong>
          </div>
          <b-card-body>
            <form @submit.prevent="fnt_redeem_code">
              <b-form-group label="Ingresar información" label-for="code"
                description="Tarjeta de regalo o recarga, el código de un influencer o comercio">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="cui-tags" />
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="giftCode" type="text" id="code" placeholder="Código" required></b-form-input>
                </b-input-group>
              </b-form-group>
              <div class="form-actions">
                <b-row>
                  <b-col lg="3" sm="6">
                    <b-button variant="outline-primary" block type="submit">
                      <i class="icon-present"></i>&nbsp;&nbsp;Canjear
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </form>
          </b-card-body>
        </b-card>
      </transition>
    </b-col>
    <b-col lg="12" class="mb-5">
      <transition name="fade">
        <b-card no-body v-if="show">
          <div slot="header">
            <strong>Detalle</strong>
            <div class="card-header-actions">
              <b-input-group size="sm">
                <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
              </b-input-group>
            </div>
          </div>
          <b-card-body>
            <b-table responsive :hover="true" :striped="true" :bordered="true" :small="true" :items="items"
              :filter="filter" :fields="fields" :current-page="currentPage" :per-page="perPage" :busy="isBusy">
              <template v-slot:table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>&nbsp;
                  <strong>Cargando</strong>
                </div>
              </template>
              <template slot="period" slot-scope="data">{{data.item.start_date | formatDate}} -
                {{data.item.end_date | formatDate}}</template>
              <template slot="payment" slot-scope="data">{{data.item.x_bank_name}}</template>
              <template slot="value" slot-scope="data">${{fnt_format_price(data.item.x_amount)}}</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">{{data.item.state == true ? "Activo" : "Inactivo"}}
                </b-badge>
              </template>
              <template slot="actions" slot-scope="data">
                <b-button size="sm" variant="outline-danger" @click="fnt_show_modal(data.item)">
                  <i class="fa fa-trash-o"></i>&nbsp;Cancelar suscripción
                </b-button>
              </template>
            </b-table>
            <nav>
              <b-pagination size="sm" :total-rows="fnt_get_rows(items)" :per-page="perPage" v-model="currentPage" />
            </nav>
          </b-card-body>
        </b-card>
      </transition>
    </b-col>
    <b-modal id="confirmation" ref="confirmation" hide-footer hide-header>
      <div class="d-block text-center">
        <div class="mb-2">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
            <title>x</title>
            <path
              d="M20.030 5.030l-1.061-1.061-6.97 6.97-6.97-6.97-1.061 1.061 6.97 6.97-6.97 6.97 1.061 1.061 6.97-6.97 6.97 6.97 1.061-1.061-6.97-6.97 6.97-6.97z"
              fill="#f86c6b" />
          </svg>
        </div>
        <h3>Cancelar plan</h3>
        <p>
          ¿Estas seguro que deseas cancelar el plan:
          <b>{{selectedPlan.name}}</b>?
        </p>
      </div>
      <b-row>
        <b-col lg="6">
          <b-button class="mt-3" variant="outline-danger" block ref="btnConfirmation" @click="fnt_block_services">Si
          </b-button>
        </b-col>
        <b-col lg="6">
          <b-button class="mt-3" variant="outline-primary" block @click="$bvModal.hide('confirmation')">No</b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal id="confirmation-payment" ref="confirmation-payment" hide-footer hide-header>
      <div class="d-block text-center">
        <div class="mb-2">
          <b-spinner style="width: 8rem; height: 8rem;" variant="primary" label="Spinning"></b-spinner>
        </div>
        <br>
        <h3>Cargando</h3>
      </div>
    </b-modal>
    <b-modal id="info-payment" :no-fade="true" ref="info-payment" no-enforce-focus hide-footer hide-header>
      <div class="d-block text-center">
        <div class="mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            focusable="false" width="8rem" height="8rem"
            style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
            <path
              d="M576 736h-32V448q0-13-9.5-22.5T512 416h-64q-13 0-22.5 9.5T416 448t9.5 22.5T448 480h32v256h-32q-13 0-22.5 9.5T416 768t9.5 22.5T448 800h128q13 0 22.5-9.5T608 768t-9.5-22.5T576 736zm-64-384q27 0 45.5-18.5T576 288t-18.5-45.5T512 224t-45.5 18.5T448 288t18.5 45.5T512 352zm0-352q-83 0-161.5 26T209 99T99 209T26 350.5T0 512q0 104 40.5 199t109 163.5t163.5 109t199 40.5t199-40.5t163.5-109t109-163.5t40.5-199q0-83-26-161.5T925 209T815 99T673.5 26T512 0zm0 961q-73 0-141.5-22.5T247 874t-96.5-97t-64-123.5T64 512q0-91 35.5-174T195 195t143-95.5T512 64t174 35.5T829 195t95.5 143T960 512t-35.5 174T829 829.5t-143 96T512 961z"
              fill="#626262" /></svg>
        </div>
        <br>
        <h3>Tarjeta de crédito</h3>
        <p>
          <b>Pago recurrente,</b> son cobros automatizados que se realizan periódicamente (mensual, anual)
        </p>
        <b-button variant="outline-secondary" @click="$bvModal.hide('info-payment')">Cancelar</b-button>&nbsp;
        <b-button variant="outline-primary" @click="$bvModal.hide('info-payment')">Continuar</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import VueScriptComponent from "vue-script-component";
  import {
    fnt_toast,
    fnt_format_price,
    fnt_get_badge,
    fnt_get_interval,
    fnt_get_rows,
    fnt_splited_list
  } from "@/shared/utils";
  export default {
    components: {
      VueScriptComponent
    },
    props: {
      active: {
        required: true,
      },
      payment: {
        required: false
      },
      back: {
        required: true,
      }
    },
    data() {
      return {
        fields: [{
            key: "name",
            label: "Plan",
            sortable: true
          },
          {
            key: "period",
            label: "Periodo",
            sortable: true
          },
          {
            key: "payment",
            label: "Pago",
            sortable: true
          },
          {
            key: "state",
            label: "Estado",
            sortable: true
          },
          {
            key: "value",
            label: "Total",
            sortable: true
          },
          {
            key: "actions",
            label: "Opciones",
            sortable: true
          }
        ],
        currentPage: 1,
        perPage: 8,
        totalRows: 0,
        filter: null,
        items: [],
        plans: [],
        paymentType: this.payment,
        isRecurring: false,
        selectedPlan: [],
        giftCode: null,
        userId: "",
        show: this.active,
        name: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        types: [],
        tbl_types_type_id: "",
        identification: "",
        key_code: "",
        isBusy: null
      };
    },
    mounted() {
      this.fnt_get_billing();
      this.fnt_get_plans();
      this.fnt_get_types();
    },
    methods: {
      fnt_get_billing() {
        this.isBusy = true;
        axios
          .get(
            "streaming/billing/" +
            JSON.parse(localStorage.sessionData).email_footprint
          )
          .then(result => {
            this.items = result.data;
            this.isBusy = false;
          });
      },
      fnt_get_plans() {
        axios.get("plan").then(result => {
          this.plans = result.data.filter(item => item.state == 1);
        });
      },
      fnt_show_modal(plan) {
        this.selectedPlan = plan;
        this.$refs["confirmation"].show();
      },
      fnt_plan(value) {
        if (value == "843e6604-715c-404b-bc40-896162af514a") {
          return "Plan principal";
        } else {
          return "Plan adicional";
        }
      },
      fnt_block_services() {
        axios
          .put("block/services/" + this.selectedPlan.service_id, {
            x_extra5: this.selectedPlan.x_extra5
          })
          .then(res => {
            this.fnt_get_billing();
            fnt_toast(res.data, this.$bvToast);
            this.$root.$emit(
              "bv::hide::modal",
              "confirmation",
              "#btnConfirmation"
            );
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_payment(plan) {
        this.$store.state.isLoading = false;
        if (this.paymentType == "Epayco") {
          axios
            .get("user/" + JSON.parse(localStorage.sessionData).email_footprint)
            .then(result => {
              let data = result.data;
              for (const i in data) {
                this.userId = data[i].user_id;
                this.key_code = data[i].key_code;
              }
              axios.get("invoice").then(res => {
                this.data = {
                  name: plan.name,
                  description: plan.name,
                  invoice: res.data[0].invoice, // Invoice fill
                  currency: "cop",
                  amount: plan.value,
                  // tax_base: plan.value - plan.value * 0.19,
                  // tax: plan.value * 0.19,
                  country: "co",
                  lang: "es",
                  external: "false",
                  extra1: plan.plan_id, // Plan id
                  extra2: this.userId, // User id
                  extra3: this.key_code, // Code id
                  confirmation:  process.env.VUE_APP_ROOT_API + "billing",
                  response:  process.env.VUE_APP_ROOT_API + "billing",
                  name_billing: JSON.parse(localStorage.sessionData).name +
                    " " +
                    JSON.parse(localStorage.sessionData).lastname,
                  email_billing: JSON.parse(localStorage.sessionData).email,
                  mobilephone_billing: JSON.parse(localStorage.sessionData).phone
                };
                var handler = ePayco.checkout.configure({
                  key: process.env.VUE_APP_EPAYCO_API_KEY,
                  test: false
                });
                handler.open(this.data);
              });
            });
        } else {
          this.isRecurring = true;
          this.selectedPlan = plan;
          this.$bvModal.show("info-payment");
        }
      },
      fnt_payment_method(type) {
        this.show = !this.show;
        this.paymentType = type;
      },
      fnt_recurring_payment() {
        this.$bvModal.show("confirmation-payment");
        if (
          !this.name ||
          !this.exp_month ||
          !this.exp_year ||
          !this.cvc ||
          !this.tbl_types_type_id ||
          !this.identification
        ) {
          fnt_toast("Debe ingresar toda la información", this.$bvToast);
        } else {
          Promise.all([axios.get("user/" + JSON.parse(localStorage.sessionData).email_footprint), axios.get("invoice")])
            .then(
              ([result, resultInvoice]) => {
                let data = result.data;
                for (const i in data) {
                  this.userId = data[i].user_id;
                  this.key_code = data[i].key_code;
                }
                axios
                  .post("recurring", {
                    number: this.number,
                    exp_year: this.exp_year,
                    exp_month: this.exp_month,
                    cvc: this.cvc,
                    name: JSON.parse(localStorage.sessionData).name,
                    lastname: JSON.parse(localStorage.sessionData).lastname,
                    email: JSON.parse(localStorage.sessionData).email,
                    phone: JSON.parse(localStorage.sessionData).phone,
                    plan_id: this.selectedPlan.plan_id,
                    tbl_types_type_id: this.tbl_types_type_id,
                    identification: this.identification,
                    // Epayco payment
                    x_id_factura: resultInvoice.data[0].invoice,
                    x_id_invoice: resultInvoice.data[0].invoice,
                    x_description: this.selectedPlan.name,
                    x_amount: this.selectedPlan.value,
                    x_amount_country: this.selectedPlan.value,
                    x_amount_ok: this.selectedPlan.value,
                    x_tax: "0",
                    x_amount_base: "0",
                    x_currency_code: "COP",
                    x_respuesta: "Aceptada",
                    x_response: "Aceptada",
                    x_business: "Tamic",
                    x_bank_name: "Suscripcion",
                    x_customer_name: JSON.parse(localStorage.sessionData).name,
                    x_customer_lastname: JSON.parse(localStorage.sessionData)
                      .lastname,
                    x_customer_email: JSON.parse(localStorage.sessionData).email,
                    x_customer_phone: JSON.parse(localStorage.sessionData).phone,
                    x_customer_movil: JSON.parse(localStorage.sessionData).phone,
                    x_customer_ind_pais: 57,
                    x_customer_country: "CO",
                    x_customer_city: JSON.parse(localStorage.sessionData).city,
                    x_extra1: this.selectedPlan.plan_id,
                    x_extra2: this.userId,
                    x_extra3: this.key_code
                  })
                  .then(result => {
                    this.$bvModal.hide("confirmation-payment");
                    fnt_toast(result.data, this.$bvToast);
                    this.number = "";
                    this.name = "";
                    this.exp_month = "";
                    this.exp_year = "";
                    this.cvc = "";
                    this.tbl_types_type_id = "";
                    this.identification = "";
                    this.fnt_get_billing();
                  })
                  .catch(err => {
                    fnt_toast(err, this.$bvToast);
                  });
              });
        }
        this.$bvModal.hide("confirmation-payment");
        this.fnt_get_billing();
      },
      fnt_redeem_code() {
        this.$store.state.isLoading = true;
        if (this.giftCode != null || this.giftCode != "") {
          Promise.all([axios.get("code/" + this.giftCode)]).then(
            ([resultCodes]) => {
              // console.log(resultCodes.data)
              if (resultCodes.data[0].code_demo >= 1) {
                fnt_toast("El codigo DEMO ya lo has utilizado.", this.$bvToast);
                this.$store.state.isLoading = false;
                return;
              }
              for (const i in resultCodes.data) {
                this.codes = resultCodes.data[i];
              }
              if (this.codes == null) {
                fnt_toast("El código no esta disponible", this.$bvToast);
                this.$store.state.isLoading = false;
              } else {
                axios.get(
                  "user/" + JSON.parse(localStorage.sessionData).email_footprint
                ).then(result => {
                  let data = result.data;
                  for (const i in data) {
                    this.userId = data[i].user_id;
                  }
                  switch (this.codes.short_name) {
                    case "CT":
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
                          x_customer_name: JSON.parse(localStorage.sessionData)
                            .name,
                          x_customer_lastname: JSON.parse(
                            localStorage.sessionData
                          ).lastname,
                          x_customer_email: JSON.parse(localStorage.sessionData)
                            .email,
                          x_customer_phone: JSON.parse(localStorage.sessionData)
                            .phone,
                          x_customer_movil: JSON.parse(localStorage.sessionData)
                            .phone,
                          x_customer_ind_pais: 57,
                          x_customer_country: "CO",
                          x_customer_city: JSON.parse(localStorage.sessionData)
                            .city,
                          x_extra1: this.codes.plan_id,
                          x_extra2: this.userId,
                          x_extra3: this.codes.code_id
                        })
                        .then(res => {
                          if (res.data == "Ok") {
                            this.giftCode = "";
                            this.$store.state.isLoading = false;
                            fnt_toast("Pago registrado", this.$bvToast);
                            this.fnt_update_key(this.codes.code_id);
                            this.fnt_get_billing();
                            let session = JSON.parse(localStorage.sessionData)
                            let profile = null;
                            if (localStorage.getItem("profile") != undefined) {
                              profile = JSON.parse(localStorage.profile)
                            }
                            // session.activeServices = 1;
                            localStorage.clear();
                            localStorage.sessionData = JSON.stringify(session);
                            if (profile != null) {
                              localStorage.profile = JSON.stringify(profile);
                            }
                          } else {
                            fnt_toast(
                              "Error: El código no esta disponible",
                              this.$bvToast
                            );
                            this.$store.state.isLoading = false;
                          }
                        });
                      break;
                    case "CI":
                      this.paymentType = "Epayco";
                      let plan = [];
                      plan.name = this.codes.plan_name;
                      plan.value =
                        this.codes.plan_value -
                        this.codes.plan_value * (this.codes.discount / 100);
                      plan.plan_id = this.codes.plan_id;
                      this.$store.state.isLoading = false;
                      this.fnt_update_key(this.codes.code_id);
                      this.fnt_payment(plan);
                      break;
                    default:
                      this.$store.state.isLoading = false;
                      fnt_toast("El código no esta disponible", this.$bvToast);
                      break;
                  }
                });
              }

            }
          );
        } else {
          this.$store.state.isLoading = false;
          fnt_toast("Ingrese un código valido", this.$bvToast);
        }
      },
      fnt_get_types() {
        Promise.all([axios.get("types")]).then(([resultType]) => {
          this.types = resultType.data.filter(item => item.value == "1");
        });
      },
      fnt_update_key(key_code) {
        axios.post("update/key/" + JSON.parse(localStorage.sessionData).email_footprint, {
          key_code: key_code
        })
      },
      fnt_format_price,
      fnt_get_badge,
      fnt_get_interval,
      fnt_get_rows,
      fnt_splited_list
    }
  };
</script>