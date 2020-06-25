<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-note" />&nbsp;
              Pagos
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
              </div>
            </div>
            <b-table responsive :hover="true" :striped="true" :bordered="true" :small="true" :items="items"
              :filter="filter" :fields="fields" :current-page="currentPage" :per-page="perPage" :busy="isBusy">
              <template v-slot:table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>&nbsp;
                  <strong>Cargando</strong>
                </div>
              </template>
              <template slot="value" slot-scope="data">${{fnt_format_price(data.item.value)}}</template>
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
    fnt_format_price
  } from "@/shared/utils";
  export default {
    name: "Category",
    mounted() {
      this.fnt_get_payments();
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "firstname",
            label: "Nombre",
            sortable: true
          },
          {
            key: "lastname",
            label: "Apellido",
            sortable: true
          },
          {
            key: "email",
            label: "Correo",
            sortable: true
          },
          {
            key: "phone",
            label: "Celular",
            sortable: true
          },
          {
            key: "rol",
            label: "Rol",
            sortable: true
          },
          {
            key: "value",
            label: "Valor",
            sortable: true
          },
          {
            key: "plan",
            label: "Plan",
            sortable: true
          },
        ],
        currentPage: 1,
        perPage: 50,
        totalRows: 0,
        filter: null,
        filterOn: [],
        isBusy: null
      };
    },
    methods: {
      fnt_get_payments() {
        this.isBusy = true;
        axios.get("payments").then(
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
      fnt_format_price
    }
  };
</script>