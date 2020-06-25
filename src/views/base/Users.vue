<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <i class="icon-note" />&nbsp;
              Usuarios
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
              <template slot="email" slot-scope="data">{{data.item.email}}</template>
              <template slot="name" slot-scope="data">{{data.item.name}}</template>
              <template slot="lastname" slot-scope="data">{{data.item.lastname}}</template>
              <template slot="identification" slot-scope="data">{{data.item.identification}}</template>
              <template slot="phone" slot-scope="data">{{data.item.phone}}</template>
              <template slot="address" slot-scope="data">{{data.item.address}}</template>
              <template slot="language" slot-scope="data">{{data.item.language}}</template>
              <template slot="date_birth" slot-scope="data">{{data.item.date_birth}}</template>
              <template slot="gender" slot-scope="data">{{data.item.gender}}</template>
              <template slot="city" slot-scope="data">{{data.item.city}}</template>
              <template slot="role" slot-scope="data">{{data.item.role}}</template>
              <template slot="type" slot-scope="data">{{data.item.type}}</template>
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
                  <b-button v-b-tooltip.hover title="Bloquear" variant="danger" size="sm"
                    @click="fnt_block_user(data.item.user_id)">
                    <i class="fa fa-ban" />
                  </b-button>
                  <b-button v-b-tooltip.hover title="Activar" variant="success" size="sm"
                    @click="fnt_active_user(data.item.user_id)">
                    <i class="fa fa-check" />
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
        <b-form v-on:submit="fnt_update_user">
          <b-row>
            <b-col sm="3">
              <b-form-group label="Nombres">
                <b-form-input v-model="name" type="text" autocomplete="name" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Apellidos">
                <b-form-input v-model="lastname" type="text" autocomplete="lastname" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Identificación">
                <b-form-input v-model="identification" type="number" autocomplete="identification" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Documento">
                <select v-model="tbl_types_type_id" name="types" id="types" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option v-for="type in types" :key="type.type_id" :value="type.type_id">{{ type.name }}</option>
                </select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <b-form-group label="Teléfono">
                <b-form-input v-model="phone" type="number" autocomplete="contact-phone" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Dirección">
                <b-form-input v-model="address" type="text" autocomplete="address" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Correo">
                <b-form-input v-model="email" type="email" autocomplete="email" />
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Contraseña">
                <b-form-input v-model="password" type="password" placeholder="Contraseña" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <b-form-group label="País">
                <select v-model="tbl_countries_country_id" @change="fnt_on_change($event)" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option v-for="country in countries" :key="country.country_id" :value="country.country_id">
                    {{ country.name }}</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Ciudad">
                <select v-model="tbl_cities_city_id" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option v-for="city in cities" :key="city.city_id" :value="city.city_id">{{ city.name }}</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Genero">
                <select v-model="gender" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Indefinido">Indefinido</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Idioma">
                <select v-model="language" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option value="Español">Español</option>
                  <option value="Inglés">Inglés</option>
                </select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <b-form-group label="Rol">
                <select v-model="tbl_roles_role_id" class="form-control">
                  <option disabled value>Seleccionar</option>
                  <option v-for="role in roles" :key="role.role_id" :value="role.role_id">{{ role.name }}</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group label="Fecha de nacimiento">
                <date-picker input-class="form-control" v-model="date_birth" lang="es" format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"></date-picker>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
        <template v-slot:modal-footer>
          <b-button variant="primary" class="float-right" @click="fnt_update_user">Guardar</b-button>
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
      this.fnt_get_user();
      this.fnt_get_types();
    },
    components: {
      DatePicker
    },
    data: () => {
      return {
        items: [],
        fields: [{
            key: "name",
            label: "Nombres",
            sortable: true,
            tdClass: "table-column-3"
          },
          {
            key: "lastname",
            label: "Apellidos",
            sortable: true
          },
          {
            key: "email",
            label: "Correo",
            sortable: true
          },
          {
            key: "identification",
            label: "Identificación",
            sortable: true
          },
          {
            key: "phone",
            label: "Teléfono",
            sortable: true
          },
          {
            key: "address",
            label: "Dirección",
            sortable: true
          },
          {
            key: "language",
            label: "Idioma",
            sortable: true
          },
          {
            key: "date_birth",
            label: "Nacimiento",
            sortable: true
          },
          {
            key: "gender",
            label: "Genero",
            sortable: true
          },
          {
            key: "city",
            label: "Ciudad",
            sortable: true
          },
          {
            key: "role",
            label: "Rol",
            sortable: true
          },
          {
            key: "type",
            label: "Documento",
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
            tdClass: "table-column-3"
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
        category_id: 0,
        flag: false,
        countries: [],
        cities: [],
        types: [],
        roles: [],
        email: "",
        password: "",
        name: "",
        lastname: "",
        identification: "",
        tbl_types_type_id: "",
        phone: "",
        address: "",
        language: "",
        date_birth: "",
        gender: "",
        tbl_cities_city_id: "",
        tbl_countries_country_id: "",
        tbl_roles_role_id: "",
        user_id: "",
        isBusy: null
      };
    },
    methods: {
      fnt_get_user() {
        this.isBusy = true;
        axios.get("people").then(
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
      fnt_update_user() {
        if (!this.flag) {
          axios
            .put("people/" + this.people_id, {
              email: this.email,
              password: this.password,
              name: this.name,
              lastname: this.lastname,
              identification: this.identification,
              tbl_types_type_id: this.tbl_types_type_id,
              phone: this.phone,
              address: this.address,
              language: this.language,
              date_birth: this.date_birth,
              gender: this.gender,
              tbl_cities_city_id: this.tbl_cities_city_id,
              tbl_countries_country_id: this.tbl_countries_country_id,
              tbl_roles_role_id: this.tbl_roles_role_id,
              user_id: this.user_id
            })
            .then(res => {
              this.fnt_get_user();
              fnt_toast("Información actualizada", this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        } else {
          this.fnt_add_user();
        }
      },
      fnt_block_user(id) {
        axios
          .put("people/block/" + id)
          .then(res => {
            this.fnt_get_user();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_active_user(id) {
        axios
          .put("people/active/" + id)
          .then(res => {
            this.fnt_get_user();
            fnt_toast(res.data, this.$bvToast);
          })
          .catch(err => {
            fnt_toast(err, this.$bvToast);
          });
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_send_data(item, index, button) {
        this.modal.title = "Usuario";
        this.modal.content = item;
        this.people_id = this.modal.content.people_id;
        this.email = this.modal.content.email;
        this.password = this.modal.content.password;
        this.name = this.modal.content.name;
        this.lastname = this.modal.content.lastname;
        this.identification = this.modal.content.identification;
        this.tbl_types_type_id = this.modal.content.type_id;
        this.phone = this.modal.content.phone;
        this.address = this.modal.content.address;
        this.language = this.modal.content.language;
        this.date_birth = new Date(this.modal.content.date_birth);
        this.gender = this.modal.content.gender;
        this.fnt_update_cities(this.modal.content.country_id);
        this.tbl_cities_city_id = this.modal.content.city_id;
        this.tbl_countries_country_id = this.modal.content.country_id;
        this.tbl_roles_role_id = this.modal.content.role_id;
        this.user_id = this.modal.content.user_id;
        this.$root.$emit("bv::show::modal", this.modal.id, button);
      },
      fnt_open_modal(button) {
        this.modal.title = "Usuario";
        this.$root.$emit("bv::show::modal", this.modal.id, button);
        this.flag = true;
      },
      fnt_get_badge,
      fnt_get_types() {
        Promise.all([
          axios.get("country"),
          axios.get("city"),
          axios.get("types"),
          axios.get("roles")
        ]).then(([resultCountry, resultCity, resultType, resultRoles]) => {
          this.countries = resultCountry.data;
          this.cities = resultCity.data;
          this.types = resultType.data.filter(item => item.value == "1");
          this.roles = resultRoles.data;
        });
      },
      fnt_on_change(event) {
        axios.get("city/" + event.target.value).then(
          result => {
            this.cities = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_add_user() {
        axios
          .post("people", {
            name: this.name,
            lastname: this.lastname,
            identification: this.identification,
            tbl_types_type_id: this.tbl_types_type_id,
            phone: this.phone,
            address: this.address,
            language: this.language,
            date_birth: this.date_birth,
            gender: this.gender,
            tbl_cities_city_id: this.tbl_cities_city_id,
            email: this.email,
            password: this.password,
            tbl_roles_role_id: this.tbl_roles_role_id
          })
          .then(res => {
            if (res.data.includes("Ingresar") || res.data.includes("error")) {
              fnt_toast(res.data, this.$bvToast);
            } else {
              this.fnt_get_user();
              fnt_toast("Información registrada", this.$bvToast);
            }
          })
          .catch(error => {
            fnt_toast(error, this.$bvToast);
          });
        this.fnt_clear_form();
      },

      fnt_clear_modal() {
        this.modal.content = "";
        this.flag = false;
        this.fnt_clear_form();
      },
      fnt_clear_form() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.lastname = "";
        this.identification = "";
        this.tbl_types_type_id = "";
        this.phone = "";
        this.address = "";
        this.language = "";
        this.date_birth = "";
        this.gender = "";
        this.tbl_cities_city_id = "";
        this.tbl_countries_country_id = "";
        this.tbl_roles_role_id = "";
      },
      fnt_update_cities(country) {
        axios.get("city/" + country).then(
          result => {
            this.cities = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      }
    }
  };
</script>