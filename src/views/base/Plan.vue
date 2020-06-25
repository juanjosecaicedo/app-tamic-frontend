<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-bag" />
              Planes
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
              <template slot="description" slot-scope="data">{{data.item.description}}</template>
              <template slot="interval_type" slot-scope="data">{{data.item.interval_type}}</template>
              <template slot="interval_count" slot-scope="data">{{data.item.interval_count}}</template>
              <template slot="value" slot-scope="data">${{fnt_format_price(data.item.value)}}</template>
              <template slot="dispositives" slot-scope="data">{{data.item.dispositives}}</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">{{data.item.state == true ? "Activo" : "Inactivo"}}
                </b-badge>
              </template>
              <template slot="created_at" slot-scope="data">{{data.item.created_at | formatDate}}</template>
              <template slot="updated_at" slot-scope="data">{{data.item.updated_at | formatDate}}</template>
              <template slot="actions" slot-scope="data">
                <b-button-group size="sm">
                  <b-button v-b-tooltip.hover title="Editar" variant="warning"
                    @click="fnt_send_data(data.item, data.index, $event.target)" size="sm">
                    <i class="fa fa-pencil" />
                  </b-button>
                  <b-button v-b-tooltip.hover title="Eliminar" variant="danger" size="sm"
                    @click="fnt_delete_plans(data.item.plan_id)">
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
      <b-modal size="lg" :id="modal.id" :title="modal.title" @hide="fnt_clear_modal">
        <form ref="form" @submit.stop.prevent="fnt_update_plans">
          <b-row>
            <b-col sm="3">
              <b-form-group label="Nombre">
                <b-form-input type="text" v-model="name" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Valor">
                <b-form-input type="number" v-model="value" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Intervalo">
                <select v-model="interval_type" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option value="day">Días</option>
                  <option value="month">Mes</option>
                  <option value="year">Año</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Tiempo">
                <b-form-input type="number" v-model="interval_count" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <b-form-group label="Dispositivos">
                <b-form-input type="number" v-model="dispositives" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Estado">
                <select v-model="state" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Tipo">
                <select v-model="tbl_types_type_id" name="types" id="types" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option v-for="type in types" :key="type.type_id" :value="type.type_id">{{ type.name }}</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Categorías">
                <multiselect v-model="select_categories" :options="categories" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Seleccionar" label="name"
                  track-by="name" :preselect-first="false">
                  <template slot="selection" slot-scope="{ values, search, isOpen }">
                    <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }}
                      categorías</span>
                  </template>
                </multiselect>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group label="Descripción">
                <b-form-textarea rows="3" max-rows="3" v-model="description" required></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <template v-slot:modal-footer>
          <b-button variant="primary" class="float-right" @click="fnt_update_plans">Guardar</b-button>
        </template>
      </b-modal>
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
      this.fnt_get_plans();
      this.fnt_get_types();
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
            key: "description",
            label: "Descripción",
            sortable: true
          },
          {
            key: "interval_type",
            label: "Intervalo",
            sortable: true
          },
          {
            key: "interval_count",
            label: "Tiempo",
            sortable: true
          },
          {
            key: "value",
            label: "Valor",
            sortable: true
          },
          {
            key: "dispositives",
            label: "Dispositivos",
            sortable: true
          },
          {
            key: "state",
            label: "Estado",
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
        perPage: 10,
        totalRows: 0,
        modal: {
          id: "info-modal",
          title: "",
          content: ""
        },
        filter: null,
        filterOn: [],
        plan_id: 0,
        name: "",
        description: "",
        interval_type: "",
        interval_count: "",
        value: "",
        dispositives: "",
        state: "",
        types: [],
        tbl_types_type_id: "",
        categories: [],
        select_categories: [],
        flag: false,
        isBusy: null
      };
    },
    methods: {
      fnt_get_plans() {
        this.isBusy = true;
        axios.get("plan").then(
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
      fnt_update_plans() {
        if (!this.flag) {          
          this.fnt_add_tags(false);
          axios
            .put("plan/" + this.plan_id, {
              name: this.name,
              description: this.description,
              interval_type: this.interval_type,
              interval_count: this.interval_count,
              value: this.value,
              dispositives: this.dispositives,
              state: this.state,
              tbl_types_type_id: this.tbl_types_type_id
            })
            .then(res => {
              this.fnt_get_plans();
              fnt_toast(res.data, this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        } else {
          this.fnt_add_plans();
        }
      },
      fnt_delete_plans(id) {
        axios.delete("plan/category/" + id).catch(err => {
          fnt_toast(err, this.$bvToast);
        });
        axios
          .delete("plan/" + id)
          .then(res => {
            this.fnt_get_plans();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_add_plans() {
        axios
          .post("plan", {
            name: this.name,
            description: this.description,
            interval_type: this.interval_type,
            interval_count: this.interval_count,
            value: this.value,
            dispositives: this.dispositives,
            state: this.state,
            tbl_types_type_id: this.tbl_types_type_id
          })
          .then(res => {
            if (res.data.includes("Ingresar") || res.data.includes("error")) {
              fnt_toast(res.data, this.$bvToast);
            } else {
              this.plan_id = res.data;
              this.name = "";
              this.fnt_add_tags(true);
              this.fnt_get_plans();
              fnt_toast("Plan registrado", this.$bvToast);
              this.fnt_clear_form();
            }
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_send_data(item, index, button) {
        this.modal.title = "Plan";
        this.modal.content = item;
        this.name = this.modal.content.name;
        this.plan_id = this.modal.content.plan_id;
        this.description = this.modal.content.description;
        this.interval_type = this.modal.content.interval_type;
        this.interval_count = this.modal.content.interval_count;
        this.value = this.modal.content.value;
        this.dispositives = this.modal.content.dispositives;
        this.state = this.modal.content.state;
        this.fnt_get_tags(this.plan_id);
        this.tbl_types_type_id = this.modal.content.tbl_types_type_id;
        this.$root.$emit("bv::show::modal", this.modal.id, button);
      },
      fnt_clear_modal() {
        this.modal.content = "";
        this.fnt_clear_form();
        this.flag = false;
      },
      fnt_open_modal(button) {
        this.modal.title = "Plan";
        this.$root.$emit("bv::show::modal", this.modal.id, button);
        this.flag = true;
      },
      fnt_get_badge,
      fnt_format_price,
      fnt_clear_form() {
        this.name = "";
        this.description = "";
        this.interval_type = "";
        this.interval_count = "";
        this.value = "";
        this.dispositives = "";
        this.state = "";
        this.tbl_types_type_id = "";
        this.select_categories = null;
      },
      fnt_get_types() {
        Promise.all([axios.get("types"), axios.get("category")]).then(
          ([resultType, resultCategories]) => {
            this.types = resultType.data.filter(item => item.value == "4");
            this.categories = resultCategories.data;
          }
        );
      },
      fnt_get_tags(id) {
        axios.get("plan/category/" + id).then(
          result => {
            this.select_categories = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_add_tags(type) {
        switch (type) {
          case true:
            for (const prop in this.select_categories) {
              axios
                .post("plan/category", {
                  tbl_plans_plan_id: this.plan_id,
                  tbl_categories_category_id: this.select_categories[prop]
                    .category_id
                })
                .catch(err => {
                  fnt_toast(err, this.$bvToast);
                });
            }
            break;
          case false:
            axios
              .delete("plan/category/" + this.plan_id)
              .then(() => {
                for (const prop in this.select_categories) {
                  axios
                    .post("plan/category", {
                      tbl_plans_plan_id: this.plan_id,
                      tbl_categories_category_id: this.select_categories[prop]
                        .category_id
                    })
                    .catch(err => {
                      fnt_toast(err, this.$bvToast);
                    });
                }
              })
              .catch(err => {
                fnt_toast(err, this.$bvToast);
              });
            break;
        }
      }
    }
  };
</script>