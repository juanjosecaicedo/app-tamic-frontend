<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-screen-desktop" />&nbsp;
              Canales TV
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
              <template slot="img_streaming" slot-scope="data">
                <img center width="60" height="60" v-lazy="data.item.img_streaming" />
              </template>
              <template slot="img_banner" slot-scope="data">
                <img width="100" height="60" v-lazy="data.item.img_banner" />
              </template>
              <template slot="title" slot-scope="data">{{data.item.title}}</template>
              <template slot="year" slot-scope="data">{{data.item.year | formatDate}}</template>
              <template slot="duration" slot-scope="data">{{data.item.duration}}</template>
              <template slot="popularity" slot-scope="data">{{data.item.popularity}}</template>
              <template slot="tbl_countries_country_id" slot-scope="data">{{data.item.country_name}}</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">
                  {{data.item.state == true ? "Publicado" : "Inactivo"}}</b-badge>
              </template>
              <template slot="created_at" slot-scope="data">{{data.item.created_movie | formatDate}}</template>
              <template slot="updated_at" slot-scope="data">{{data.item.updated_movie | formatDate}}</template>
              <template slot="actions" slot-scope="data">
                <b-button-group size="sm">
                  <b-button v-b-tooltip.hover title="Editar" variant="warning"
                    @click="fnt_send_data(data.item, data.index, $event.target)" size="sm">
                    <i class="fa fa-pencil" />
                  </b-button>

                  <b-button v-b-tooltip.hover title="Eliminar" variant="danger" size="sm"
                    @click="fnt_delete_channels(data.item.streaming_id)">
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
      <b-modal scrollable size="lg" :id="modal.id" :title="modal.title" @hide="fnt_clear_modal">
        <form ref="form" @submit.stop.prevent="fnt_update_channels">
          <b-row>
            <b-col sm="4">
              <b-form-group label="Nombre">
                <b-form-input type="text" v-model="title" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="País">
                <select v-model="tbl_countries_country_id" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option v-for="country in countries" :key="country.country_id" :value="country.country_id">
                    {{ country.name }}</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Tiempo">
                <b-form-input v-model="duration" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group label="Popularidad">
                <b-form-input type="number" v-model="popularity" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Estado">
                <select v-model="state" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Fecha">
                <date-picker input-class="form-control" v-model="year" lang="es" format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"></date-picker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group label="Url">
                <b-form-input v-model="url_streaming" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
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
            <b-col sm="6">
              <b-form-group label="Imagen">
                <b-form-input v-model="img_streaming" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group label="Banner">
                <b-form-input v-model="img_banner" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group label="Descripción">
                <b-form-textarea rows="2" max-rows="2" v-model="description" required></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <template v-slot:modal-footer>
          <b-button variant="primary" class="float-right" @click="fnt_update_channels">Guardar</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
  import {
    fnt_toast,
    fnt_get_badge
  } from "@/shared/utils";
  import DatePicker from "vue2-datepicker";
  export default {
    mounted() {
      this.fnt_get_channels();
      this.fnt_get_types();
    },
    components: {
      DatePicker
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "img_streaming",
            label: "Imagen",
            sortable: true
          },
          {
            key: "img_banner",
            label: "Banner",
            sortable: true
          },
          {
            key: "title",
            label: "Nombre",
            sortable: true
          },
          {
            key: "year",
            label: "Año",
            sortable: true
          },
          {
            key: "duration",
            label: "Tiempo",
            sortable: true
          },
          {
            key: "popularity",
            label: "Popularidad",
            sortable: true
          },
          {
            key: "state",
            label: "Estado",
            sortable: true
          },
          {
            key: "tbl_countries_country_id",
            label: "País",
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
        countries: [],
        categories: [],
        streaming_id: 0,
        title: "",
        description: "",
        year: "",
        duration: "Live",
        popularity: "",
        img_streaming: null,
        img_banner: "",
        url_trailer: "Indefinido",
        url_streaming: "",
        tbl_countries_country_id: "",
        flag: false,
        select_categories: [],
        state: "",
        isBusy: null
      };
    },
    methods: {
      fnt_get_channels() {
        this.isBusy = true;
        axios.get("channels").then(
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
      fnt_update_channels() {
        let data = new FormData();
        data.append("title", this.title);
        data.append("description", this.description);
        data.append("year", this.year);
        data.append("duration", this.duration);
        data.append("popularity", this.popularity);
        data.append("img_streaming", this.img_streaming);
        data.append("img_banner", this.img_banner);
        data.append("url_trailer", this.url_trailer);
        data.append("url_streaming", this.url_streaming);
        data.append("state", this.state);
        data.append("tbl_countries_country_id", this.tbl_countries_country_id);
        data.append("tbl_types_type_id", "9608482c-a6c4-4694-8478-16cb9b59c45e");
        data.append("categories", this.select_categories);
        if (!this.flag) {
          this.fnt_add_tags(false);
          axios
            .put("channels/" + this.streaming_id, data)
            .then(res => {
              this.fnt_get_channels();
              fnt_toast(res.data, this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        } else {
          this.fnt_add_channels(data);
        }
      },
      fnt_delete_channels(id) {
        axios.delete("streaming/category/" + id).catch(err => {
          fnt_toast(err, this.$bvToast);
        });
        axios
          .delete("channels/" + id)
          .then(res => {
            this.fnt_get_channels();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_add_channels(data) {
        axios
          .post("channels", data)
          .then(res => {
            if (res.data.includes("Ingresar") || res.data.includes("error")) {
              fnt_toast(res.data, this.$bvToast);
            } else {
              this.streaming_id = res.data;
              this.fnt_get_channels();
              this.fnt_add_tags(true);
              this.fnt_clear_form();
              fnt_toast("Canal registrado", this.$bvToast);
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
        this.modal.title = "Canal TV";
        this.modal.content = item;
        this.title = this.modal.content.title;
        this.description = this.modal.content.description;
        this.year = this.modal.content.year;
        this.duration = this.modal.content.duration;
        this.popularity = this.modal.content.popularity;
        this.img_streaming = this.modal.content.img_streaming;
        this.img_banner = this.modal.content.img_banner;
        this.url_trailer = this.modal.content.url_trailer;
        this.url_streaming = this.modal.content.url_streaming;
        this.state = this.modal.content.state;
        this.tbl_countries_country_id = this.modal.content.tbl_countries_country_id;
        this.streaming_id = this.modal.content.streaming_id;
        this.fnt_get_tags(this.streaming_id);
        this.$root.$emit("bv::show::modal", this.modal.id, button);
      },
      fnt_clear_modal() {
        this.modal.content = "";
        this.fnt_clear_form();
        this.flag = false;
      },
      fnt_clear_form() {
        this.title = "";
        this.description = "";
        this.year = "";
        this.duration = "Live";
        this.popularity = "";
        this.img_streaming = "";
        this.img_banner = "";
        this.url_trailer = "Indefinido";
        this.url_streaming = "";
        this.tbl_countries_country_id = "";
        this.state = "";
        this.select_categories = null;
      },
      fnt_open_modal(button) {
        this.modal.title = "Canal TV";
        this.$root.$emit("bv::show::modal", this.modal.id, button);
        this.flag = true;
      },
      fnt_get_types() {
        Promise.all([axios.get("country"), axios.get("category")]).then(
          ([resultCountry, resultCategory]) => {
            this.countries = resultCountry.data;
            this.categories = resultCategory.data;
          }
        );
      },
      fnt_get_badge,
      fnt_get_tags(id) {
        axios.get("streaming/category/" + id).then(
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
                .post("streaming/category", {
                  tbl_streaming_streaming_id: this.streaming_id,
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
              .delete("streaming/category/" + this.streaming_id)
              .then(() => {
                for (const prop in this.select_categories) {
                  axios
                    .post("streaming/category", {
                      tbl_streaming_streaming_id: this.streaming_id,
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
  }
</script>