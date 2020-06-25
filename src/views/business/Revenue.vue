<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-chart" />&nbsp;
              Ingresos
              <div class="card-header-actions">
                <b-input-group size="sm">
                  <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
                  <b-input-group-append>
                    <b-button v-b-tooltip.hover title="Limpiar" :disabled="!filter" @click="filter = ''">
                      <i class="fa fa-times" />
                    </b-button>
                    <!-- <download-excel class="btn btn-success btn-sm" worksheet="Items" name="file.xls" :data="items">
                      <i class="fa fa-file-excel-o"></i>
                    </download-excel> -->
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
            <b-table responsive :hover="true" :striped="true" :bordered="true" :small="false" :items="items"
              :filter="filter" :fields="fields" :current-page="currentPage" :per-page="perPage" :busy="isBusy">
              <template v-slot:table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>&nbsp;
                  <strong>Cargando</strong>
                </div>
              </template>
              <template slot="value" slot-scope="data">${{fnt_format_price(data.item.value)}}</template>
              <template slot="x_amount" slot-scope="data">${{fnt_format_price(data.item.x_amount)}}</template>
              <template slot="commission" slot-scope="data">{{data.item.commission}}%</template>
              <template slot="discount" slot-scope="data">{{data.item.discount}}%</template>
              <template slot="gain"
                slot-scope="data">${{fnt_format_price(fnt_calculate_discount(data.item.x_amount,data.item.commission))}}</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">
                  {{data.item.state == true ? "Código activo" : "Código inactivo"}}</b-badge>
              </template>
              <template slot="month" slot-scope="data">{{data.item.month}}</template>
              <template slot="year" slot-scope="data">{{data.item.year}}</template>
              <template slot="created_at" slot-scope="data">{{data.item.created_at | formatDate}}</template>
            </b-table>
            <nav>
              <b-pagination size="sm" :total-rows="fnt_get_rows(items)" :per-page="perPage" v-model="currentPage" />
            </nav>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_format_price,
    fnt_get_badge,
    fnt_calculate_discount
  } from "@/shared/utils";

  export default {
    mounted() {
      this.fnt_get_revenues();
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "x_customer_name",
            label: "Nombres",
            sortable: true
          },
          {
            key: "x_customer_lastname",
            label: "Apellidos",
            sortable: true
          },
          {
            key: "value",
            label: "Plan",
            sortable: true
          },
          {
            key: "x_amount",
            label: "Venta",
            sortable: true
          },
          {
            key: "x_customer_city",
            label: "Ciudad",
            sortable: true
          },
          {
            key: "code",
            label: "Código",
            sortable: true
          },
          {
            key: "x_bank_name",
            label: "Banco",
            sortable: true
          },
          {
            key: "commission",
            label: "Comisión",
            sortable: true
          },
          {
            key: "discount",
            label: "Descuento",
            sortable: true
          },
          {
            key: "state",
            label: "Estado",
            sortable: true
          },
          {
            key: "gain",
            label: "Ganancia",
            sortable: true
          },
          {
            key: "month",
            label: "Mes",
            sortable: true
          },
          {
            key: "year",
            label: "Año",
            sortable: true
          },
          {
            key: "created_at",
            label: "Fecha",
            sortable: true
          }
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        filter: null,
        filterOn: [],
        id: "all",
        isBusy: null
      };
    },
    methods: {
      fnt_get_revenues() {
        this.isBusy = true;
        if (
          JSON.parse(localStorage.sessionData).tbl_roles_role_id ==
          "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
        ) {
          this.id = JSON.parse(localStorage.sessionData).email_footprint
        } else {
          this.id = "all";
        }
        axios.get("revenues/" + this.id).then(
          result => {
            this.items = result.data;
            this.isBusy = false;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_format_price,
      fnt_get_badge,
      fnt_calculate_discount
    }
  };
</script>