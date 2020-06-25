<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-note" />&nbsp;
              Episodios
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
              <template slot="img_chapter" slot-scope="data">
                <img center width="100" height="60" v-lazy="data.item.img_chapter" />
              </template>
              <template slot="name" slot-scope="data">{{data.item.name}}</template>
              <template slot="duration" slot-scope="data">{{data.item.duration}}</template>
              <template slot="tbl_streaming_streaming_id" slot-scope="data">{{data.item.serie_name}}</template>
              <template slot="season" slot-scope="data">{{data.item.season}}</template>
              <template slot="state" slot-scope="data">
                <b-badge :variant="fnt_get_badge(data.item.state)">
                  {{data.item.state == true ? "Publicado" : "Inactivo"}}</b-badge>
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
                    @click="fnt_delete_chapters(data.item.chapter_id)">
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
        <form ref="form" @submit.stop.prevent="fnt_update_chapters">
          <b-row>
            <b-col sm="3">
              <b-form-group label="Temporada">
                <b-form-input type="text" v-model="season" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Nombre">
                <b-form-input type="text" v-model="name" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Tiempo">
                <b-form-input v-model="duration" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Estado">
                <select v-model="state" class="form-control" required>
                  <option disabled value>Seleccionar</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group label="Url">
                <b-form-input v-model="url_chapter" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Imagen">
                <b-input v-model="img_chapter" required></b-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Series">
                <multiselect v-model="tbl_streaming_streaming_id" :options="series" :multiple="false"
                  :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Seleccionar"
                  label="title" track-by="title" :preselect-first="false">
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
                <b-form-textarea rows="4" max-rows="4" v-model="description" required></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <template v-slot:modal-footer>
          <b-button variant="primary" class="float-right" @click="fnt_update_chapters">Guardar</b-button>
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
  export default {    
    mounted() {
      this.fnt_get_chapters();
      this.fnt_get_types();
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "img_chapter",
            label: "Imagen",
            sortable: true
          },
          {
            key: "name",
            label: "Nombre",
            sortable: true
          },
          {
            key: "duration",
            label: "Duración",
            sortable: true
          },
          {
            key: "tbl_streaming_streaming_id",
            label: "Serie",
            sortable: true
          },
          {
            key: "season",
            label: "Temporada",
            sortable: true
          },
          {
            key: "consecutive",
            label: "Consecutivo",
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
            tdClass: "table-column"
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
        series: [],
        chapter_id: 0,
        season: "",
        name: "",
        description: "",
        duration: "",
        img_chapter: "",
        url_chapter: "",
        tbl_streaming_streaming_id: [],
        flag: false,
        changeImg: false,
        url_img_chapter: "",
        state: "",
        isBusy: null
      };
    },
    methods: {
      fnt_get_chapters() {
        this.isBusy = true;
        if (this.$route.params.streaming_id != null) {
          axios.get("episodes/" + this.$route.params.streaming_id).then(
            result => {
              this.items = result.data;
              this.isBusy = false;
            },
            error => {
              fnt_toast(error, this.$bvToast);
              this.isBusy = false;
            }
          );
        } else {
          axios.get("episodes").then(
            result => {
              this.items = result.data;
              this.isBusy = false;
            },
            error => {
              fnt_toast(error, this.$bvToast);
              this.isBusy = false;
            }
          );
        }
      },
      fnt_update_chapters() {
        let data = new FormData();
        data.append("season", this.season);
        data.append("name", this.name);
        data.append("description", this.description);
        data.append("duration", this.duration);
        data.append("state", this.state);
        data.append("img_chapter", this.img_chapter);
        data.append("url_chapter", this.url_chapter);
        if (!this.flag) {
          let id = "";
          if (!this.tbl_streaming_streaming_id.streaming_id) {
            for (const i in this.tbl_streaming_streaming_id) {
              id = this.tbl_streaming_streaming_id[i].streaming_id;
            }
          } else {
            id = this.tbl_streaming_streaming_id.streaming_id;
          }
          data.append("tbl_streaming_streaming_id", id);
          axios
            .put("chapters/" + this.chapter_id, data)
            .then(res => {
              this.fnt_get_chapters();
              fnt_toast(res.data, this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        } else {
          data.append(
            "tbl_streaming_streaming_id",
            this.tbl_streaming_streaming_id.streaming_id
          );
          this.fnt_add_chapters(data);
        }
      },
      fnt_delete_chapters(id) {
        axios
          .delete("chapters/" + id)
          .then(res => {
            this.fnt_get_chapters();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_add_chapters(data) {
        axios
          .post("chapters", data)
          .then(res => {
            if (res.data.includes("Ingresar") || res.data.includes("error")) {
              fnt_toast(res.data, this.$bvToast);
            } else {
              this.fnt_get_chapters();
              this.fnt_clear_form();
              fnt_toast(res.data, this.$bvToast);
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
        this.modal.title = "Episodio";
        this.modal.content = item;
        this.season = this.modal.content.season;
        this.name = this.modal.content.name;
        this.description = this.modal.content.description;
        this.duration = this.modal.content.duration;
        this.img_chapter = this.modal.content.img_chapter;
        this.url_img_chapter = this.modal.content.img_chapter;
        this.url_chapter = this.modal.content.url_chapter;
        this.state = this.modal.content.state;
        this.fnt_get_series(this.modal.content.tbl_streaming_streaming_id);
        this.chapter_id = this.modal.content.chapter_id;
        this.$root.$emit("bv::show::modal", this.modal.id, button);
      },
      fnt_clear_modal() {
        this.modal.content = "";
        this.fnt_clear_form();
        this.flag = false;
      },
      fnt_clear_form() {
        this.season = "";
        this.name = "";
        this.description = "";
        this.duration = "";
        this.img_chapter = "";
        this.url_chapter = "";
        this.tbl_streaming_streaming_id = "";
        this.state = "";
      },
      fnt_open_modal(button) {
        this.modal.title = "Episodio";
        this.$root.$emit("bv::show::modal", this.modal.id, button);
        this.flag = true;
      },
      fnt_get_types() {
        Promise.all([axios.get("series")]).then(([resultSeries]) => {
          this.series = resultSeries.data;
        });
      },
      fnt_get_series(id) {
        axios.get("series/" + id).then(
          result => {
            this.tbl_streaming_streaming_id = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_get_badge
    }
  };
</script>