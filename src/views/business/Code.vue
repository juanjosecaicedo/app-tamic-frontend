<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-layers" />&nbsp;
              Códigos
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
              <template slot="plan_value" slot-scope="data">${{fnt_format_price(data.item.plan_value)}}</template>
              <template slot="commission" slot-scope="data">{{data.item.commission}}%</template>
              <template slot="discount" slot-scope="data">{{data.item.discount}}%</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">
                  {{data.item.state == true ? "Código activo" : "Código inactivo"}}</b-badge>
              </template>
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
    fnt_get_badge
  } from "@/shared/utils";
  export default {
    mounted() {
      this.fnt_get_codes();
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "code",
            label: "Código",
            sortable: true
          },
          {
            key: "type_name",
            label: "Tipo",
            sortable: true
          },
          {
            key: "plan_name",
            label: "Plan",
            sortable: true
          },
          {
            key: "plan_value",
            label: "Valor",
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
      fnt_get_codes() {
        this.isBusy = true;
        if (
          JSON.parse(localStorage.sessionData).tbl_roles_role_id ==
          "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
        ) {
          this.id = JSON.parse(localStorage.sessionData).email_footprint
        } else {
          this.id = "all";
        }
        axios.get("codes/" + this.id).then(
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
      fnt_format_price,
      fnt_get_badge
    }
  };
</script>