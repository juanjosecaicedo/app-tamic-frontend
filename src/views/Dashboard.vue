<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <sup>$</sup>
              {{fnt_format_price(gain)}}
            </h4>
            <p>Ganancias</p>
          </b-card-body>
          <card-line1-chart chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" v-if="loaded_gain"
            :height="70" :data="data_gain" :labels="labels_gain" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{count}}</h4>
            <p>Usuarios asociados</p>
          </b-card-body>
          <card-line2-chart chartId="card-chart-02" class="chart-wrapper px-3" style="height:70px;" :height="70"
            v-if="loaded_count" :data="data_count" :labels="labels_count" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{active}}</h4>
            <p>Usuarios activos</p>
          </b-card-body>
          <card-line3-chart chartId="card-chart-03" class="chart-wrapper" style="height:70px;" height="70"
            v-if="loaded_active" :data="data_active" :labels="labels_active" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{inactive}}</h4>
            <p>Usuarios inactivos</p>
          </b-card-body>
          <card-bar-chart chartId="card-chart-04" class="chart-wrapper px-3" style="height:70px;" height="70"
            v-if="loaded_inactive" :data="data_inactive" :labels="labels_inactive" />
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Tráfico</h4>
          <div class="small text-muted">{{currentDate | formatDate}}</div>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <b-button v-b-tooltip title="Actualizar" type="button" variant="primary" class="float-right"
            @click="fnt_get_traffic">
            <i class="icon-refresh"></i>
          </b-button>
        </b-col>
      </b-row>
      <main-chart chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"
        :labels="labels" :data="array_traffic" v-if="loaded_traffic"></main-chart>
    </b-card>
    <b-row>
      <b-col md="12">
        <b-card header="Tráfico &amp; Ventas">
          <b-row>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="info">
                    <small class="text-muted">Nuevos clientes</small>
                    <br />
                    <strong class="h4">{{new_users}}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart chartId="callout-chart-01" :data="data_new" :labels="labels_new" v-if="loaded_new"
                        variant="info" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Clientes recurrentes</small>
                    <br />
                    <strong class="h4">{{recurrent}}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart chartId="callout-chart-02" :data="data_recurrent" :labels="labels_recurrent"
                        v-if="loaded_recurrent" variant="danger" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0" />
              <div class="chart-wrapper">
                <card-line chartId="chart-bar-01" :first_data="array_recurrent_users" :second_data="array_new_users"
                  :labels="labels" v-if="fnt_validate()" />
              </div>
            </b-col>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="warning">
                    <small class="text-muted">Total clientes</small>
                    <br />
                    <strong class="h4">{{gender}}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart chartId="callout-chart-03" :data="data_gender" :labels="labels_gender"
                        v-if="loaded_gender" variant="#f8cb00" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Categorías</small>
                    <br />
                    <strong class="h4">{{count_categories}}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart chartId="callout-chart-04" :data="data_count_categories"
                        :labels="labels_count_categories" v-if="loaded_count_categories" variant="#4dbd74" width="80"
                        height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0" />
              <div class="chart-wrapper mb-5">
                <card-doughnut chartId="chart-doughnut-01" :data="data_gender" :labels="labels_gender"
                  v-if="loaded_gender" :height="150" />
              </div>
              <div class="chart-wrapper">
                <card-doughnut chartId="chart-doughnut-01" :data="data_count_categories"
                  :labels="labels_count_categories" v-if="loaded_count_categories" :height="150" />
              </div>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <div slot="header">
                <div class="card-header-actions">
                  <b-input-group size="sm">
                    <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
                    <b-input-group-append>
                      <b-button v-b-tooltip.hover title="Limpiar" :disabled="!filter" @click="filter = ''">
                        <i class="fa fa-times" />
                      </b-button>
                      <download-excel class="btn btn-success btn-sm" worksheet="Items" name="file.xls" :data="items">
                        <i class="fa fa-file-excel-o"></i>
                      </download-excel>
                    </b-input-group-append>
                  </b-input-group>
                  <br />
                </div>
              </div>
              <b-table head-variant="light" responsive :hover="true" :striped="false" :bordered="true" :small="false"
                :items="items" :filter="filter" :fields="fields" :current-page="currentPage" :per-page="perPage"
                :busy="isBusy">
                <template v-slot:table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>&nbsp;
                    <strong>Cargando</strong>
                  </div>
                </template>
                <div slot="x_customer_name" slot-scope="data">
                  <div>{{data.item.x_customer_name}} {{data.item.x_customer_lastname}}</div>
                </div>
                <template slot="x_amount" slot-scope="data">${{fnt_format_price(data.item.x_amount)}}</template>
                <template slot="gain"
                  slot-scope="data">${{fnt_format_price(fnt_calculate_discount(data.item.x_amount,data.item.commission))}}</template>
                <template slot="flag" slot-scope="data">
                  <i slot="country" class="h4 mb-0" :class="flag(data.item.x_customer_country)"></i>
                </template>
              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="fnt_get_rows(items)" :per-page="perPage" v-model="currentPage" />
              </nav>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import CardLine1Chart from "./charts/CardLine1Chart";
  import CardLine2Chart from "./charts/CardLine2Chart";
  import CardLine3Chart from "./charts/CardLine3Chart";
  import CardBarChart from "./charts/CardBarChart";
  import MainChart from "./charts/MainChart";
  import CalloutChart from "./charts/CalloutChart";
  import CardDoughnut from "./charts/CardDoughnut";
  import CardBar from "./charts/CardBar";
  import CardLine from "./charts/CardLine";
  import {
    Callout
  } from "@coreui/vue";
  import {
    fnt_format_price,
    fnt_calculate_discount
  } from "@/shared/utils";

  export default {
    beforeCreate: function () {
      document.body.className =
        "dashboard sidebar-lg-show header-fixed sidebar-fixed";
    },
    async mounted() {
      this.fnt_get_data();
      this.fnt_get_revenues();
    },
    components: {
      Callout,
      CardLine1Chart,
      CardLine2Chart,
      CardLine3Chart,
      CardBarChart,
      MainChart,
      CalloutChart,
      CardDoughnut,
      CardBar,
      CardLine
    },
    data: () => {
      return {
        id: "all",
        currentDate: null,
        gain: 0,
        count: 0,
        active: 0,
        inactive: 0,
        new_users: 0,
        recurrent: 0,
        gender: 0,
        count_categories: 0,
        array: [],
        items: [],
        fields: [{
            key: "email",
            label: "Comercio",
            sortable: true
          },
          {
            key: "phone",
            label: "Contacto",
            sortable: true
          },
          {
            key: "x_customer_name",
            label: "Usuario",
            sortable: true
          },
          {
            key: "flag",
            label: "País",
            sortable: true
          },
          {
            key: "x_customer_city",
            label: "Ciudad",
            sortable: true
          },
          {
            key: "x_bank_name",
            label: "Banco",
            sortable: true
          },
          {
            key: "x_amount",
            label: "Valor",
            sortable: true
          },
          {
            key: "gain",
            label: "Ganancia",
            sortable: true
          }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        filter: null,
        filterOn: [],
        data_gain: [],
        labels_gain: [],
        data_count: [],
        labels_count: [],
        data_active: [],
        labels_active: [],
        data_inactive: [],
        labels_inactive: [],
        data_new: [],
        labels_new: [],
        data_recurrent: [],
        labels_recurrent: [],
        data_gender: [],
        labels_gender: [],
        data_count_categories: [],
        labels_count_categories: [],
        array_new_users: [],
        array_recurrent_users: [],
        array_traffic: [],
        loaded_gain: false,
        loaded_count: false,
        loaded_active: false,
        loaded_inactive: false,
        loaded_new: false,
        loaded_recurrent: false,
        loaded_gender: false,
        loaded_count_categories: false,
        loaded_traffic: false,
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        isBusy: null
      };
    },
    methods: {
      fnt_get_gain() {
        this.loaded_gain = false;
        axios.get("earnings/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.gain += this.array[i].gain;
            this.data_gain.push(this.array[i].gain);
            this.labels_gain.push(this.array[i].month);
          }
          this.loaded_gain = true;
        });
      },
      fnt_get_count_users() {
        this.loaded_count = false;
        axios.get("count/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.count += this.array[i].count;
            this.data_count.push(this.array[i].count);
            this.labels_count.push(this.array[i].month);
          }
          this.loaded_count = true;
        });
      },
      fnt_get_active_users() {
        this.loaded_active = false;
        axios.get("active/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.active += this.array[i].count;
            this.data_active.push(this.array[i].count);
            this.labels_active.push(this.array[i].month);
          }
          this.loaded_active = true;
        });
      },
      fnt_get_inactive_users() {
        this.loaded_inactive = false;
        axios.get("inactive/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.inactive += this.array[i].count;
            this.data_inactive.push(this.array[i].count);
            this.labels_inactive.push(this.array[i].month);
          }
          this.loaded_inactive = true;
        });
      },
      fnt_get_new_users() {
        this.loaded_new = false;
        axios.get("new/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.new_users += this.array[i].count;
            this.data_new.push(this.array[i].count);
            this.labels_new.push(this.array[i].month);
          }

          for (const j in this.labels) {
            for (const i in this.array) {
              if (this.array[i].month == this.labels[j]) {
                this.array_new_users[j] = this.array[i].count;
                break;
              } else {
                this.array_new_users[j] = 0;
              }
            }
          }
          this.loaded_new = true;
        });
      },
      fnt_get_recurrent_users() {
        this.loaded_recurrent = false;
        axios.get("recurrent/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.recurrent += this.array[i].count;
            this.data_recurrent.push(this.array[i].count);
            this.labels_recurrent.push(this.array[i].month);
          }

          for (const j in this.labels) {
            for (const i in this.array) {
              if (this.array[i].month == this.labels[j]) {
                this.array_recurrent_users[j] = this.array[i].count;
                break;
              } else {
                this.array_recurrent_users[j] = 0;
              }
            }
          }
          this.loaded_recurrent = true;
        });
      },
      fnt_get_traffic() {
        this.currentDate = new Date();
        this.loaded_traffic = false;
        axios.get("traffic/" + this.id).then(result => {
          this.array = result.data;
          for (const j in this.labels) {
            for (const i in this.array) {
              if (this.array[i].month == this.labels[j]) {
                this.array_traffic[j] = this.array[i].count;
                break;
              } else {
                this.array_traffic[j] = 0;
              }
            }
          }
          this.loaded_traffic = true;
        });
      },
      fnt_get_gender_users() {
        this.loaded_gender = false;
        axios.get("gender/users/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.gender += this.array[i].count;
            this.data_gender.push(this.array[i].count);
            this.labels_gender.push(this.array[i].gender);
          }
          this.loaded_gender = true;
        });
      },
      fnt_get_count_categories() {
        this.loaded_count_categories = false;
        axios.get("count/categories/" + this.id).then(result => {
          this.array = result.data;
          for (const i in this.array) {
            this.count_categories += this.array[i].count;
            this.data_count_categories.push(this.array[i].count);
            this.labels_count_categories.push(this.array[i].name);
          }
          this.loaded_count_categories = true;
        });
      },
      fnt_validate_session() {
        this.id = "all";
      },
      flag(value) {
        return "flag-icon flag-icon-" + value.toLowerCase();
      },
      fnt_get_data() {
        this.fnt_get_new_users();
        this.currentDate = new Date();
        this.fnt_get_gain();
        this.fnt_get_count_users();
        this.fnt_get_active_users();
        this.fnt_get_inactive_users();
        this.fnt_get_recurrent_users();
        this.fnt_get_gender_users();
        this.fnt_get_count_categories();
        this.fnt_get_traffic();
      },
      fnt_format_price,
      fnt_get_revenues() {
        this.isBusy = true;
        axios.get("revenues/" + this.id).then(
          result => {
            this.items = result.data;
            this.isBusy = false;
          },
          error => {
            fnt_toast(error, this.$bvToast);
            this.isBusy = false;
          }
        );
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_validate() {
        if (this.loaded_new == true && this.loaded_recurrent == true) {
          return true;
        } else {
          return false;
        }
      },
      fnt_calculate_discount
    }
  };
</script>