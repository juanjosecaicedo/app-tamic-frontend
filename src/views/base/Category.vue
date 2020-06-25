<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-note" />&nbsp;
              Categorías
              <div class="card-header-actions">
                <b-input-group size="sm">
                  <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
                  <b-input-group-append>
                    <b-button v-b-tooltip.hover title="Limpiar" :disabled="!filter" @click="filter = ''">
                      <i class="fa fa-times" />
                    </b-button>
                    <b-button v-b-tooltip.hover title="Crear" variant="primary" size="sm"
                      @click="fnt_open_modal($event.target)">
                      <i class="fa fa-plus" />
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
              <template slot="name" slot-scope="data">{{data.item.name}}</template>
              <template slot="created_at" slot-scope="data">{{data.item.created_at | formatDate}}</template>
              <template slot="updated_at" slot-scope="data">{{data.item.updated_at | formatDate}}</template>
              <template slot="actions" slot-scope="data">
                <b-button-group size="sm">
                  <b-button v-b-tooltip.hover title="Editar" variant="warning"
                    @click="fnt_send_data(data.item, data.index, $event.target)" size="sm">
                    <i class="fa fa-pencil" />
                  </b-button>
                  <b-button v-b-tooltip.hover title="Eliminar" variant="danger" size="sm"
                    @click="fnt_delete_categories(data.item.category_id)">
                    <i class="fa fa-trash" />
                  </b-button>
                </b-button-group>
              </template>
            </b-table>
            <nav>
              <b-pagination size="sm" :total-rows="fnt_get_rows(items)" :per-page="perPage" v-model="currentPage" />
            </nav>
          </b-card>
        </b-col>
      </b-row>
      <b-modal :id="modal.id" :title="modal.title" @hide="fnt_clear_modal">
        <form ref="form" @submit.stop.prevent="fnt_update_categories">
          <b-form-group label="Nombre">
            <b-form-input type="text" :state="$v.name.$dirty ? !$v.name.$error : null" v-model="$v.name.$model"
              required></b-form-input>
          </b-form-group>
        </form>
        <template v-slot:modal-footer>
          <b-button variant="primary" class="float-right" @click="fnt_update_categories">Guardar</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
  import {
    required
  } from "vuelidate/lib/validators";
  import {
    fnt_toast
  } from "@/shared/utils";
  export default {
    name: "Category",
    mounted() {
      this.fnt_get_categories();
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "name",
            label: "Nombre",
            sortable: true
          },
          {
            key: "created_at",
            label: "Creación",
            sortable: true
          },
          {
            key: "updated_at",
            label: "Actualización",
            sortable: true
          },
          {
            key: "actions",
            label: "Opciones",
            tdClass: "table-column-2"
          }
        ],
        currentPage: 1,
        perPage: 8,
        totalRows: 0,
        modal: {
          id: "info-modal",
          title: "",
          content: ""
        },
        filter: null,
        filterOn: [],
        name: "",
        category_id: 0,
        flag: false,
        submitStatus: null,
        isBusy: null
      };
    },
    validations: {
      name: {
        required
      }
    },
    methods: {
      fnt_get_categories() {
        this.isBusy = true;
        axios.get("category").then(
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
      fnt_update_categories() {
        if (!this.flag) {
          this.$v.$touch();
          if (this.$v.$invalid) {
            this.submitStatus = "ERROR";
          } else {
            axios
              .put("category/" + this.category_id, {
                name: this.name
              })
              .then(res => {
                this.fnt_get_categories();
                fnt_toast(res.data, this.$bvToast);
              })
              .catch(err => {
                fnt_toast(err, this.$bvToast);
              });
          }
        } else {
          this.fnt_add_categories();
        }
      },
      fnt_delete_categories(id) {
        axios
          .delete("category/" + id)
          .then(res => {
            this.fnt_get_categories();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_add_categories() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = "ERROR";
        } else {
          this.$v.$reset();
          axios
            .post("category", {
              name: this.name
            })
            .then(res => {
              this.name = "";
              this.fnt_get_categories();
              fnt_toast(res.data, this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        }
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_send_data(item, index, button) {
        this.modal.title = "Categoría";
        this.modal.content = item;
        this.name = this.modal.content.name;
        this.category_id = this.modal.content.category_id;
        this.$root.$emit("bv::show::modal", this.modal.id, button);
      },
      fnt_clear_modal() {
        this.modal.content = "";
        this.name = "";
        this.flag = false;
      },
      fnt_open_modal(button) {
        this.modal.title = "Categoría";
        this.$root.$emit("bv::show::modal", this.modal.id, button);
        this.flag = true;
      }
    }
  };
</script>