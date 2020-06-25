<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Influencers">
                <b-card header-tag="header" footer-tag="footer">
                  <div slot="header">
                    <i class="icon-note" />
                    Enlaces
                    <div class="card-header-actions">
                      <b-input-group size="sm">
                        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar">
                        </b-form-input>
                        <b-input-group-append>
                          <b-button v-b-tooltip.hover title="Limpiar" :disabled="!filter" @click="filter = ''">
                            <i class="fa fa-times" />
                          </b-button>

                          <b-button v-b-tooltip.hover title="Crear" variant="primary" size="sm"
                            @click="fnt_open_modal_influencers($event.target)">
                            <i class="fa fa-plus" />
                          </b-button>

                          <download-excel class="btn btn-success btn-sm" worksheet="Items" name="file.xls"
                            :data="itemsInfluencers">
                            <i class="fa fa-file-excel-o"></i>
                          </download-excel>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                  <b-table responsive :hover="true" :striped="true" :bordered="true" :small="true"
                    :items="itemsInfluencers" :filter="filter" :fields="fieldsInfluencers" :current-page="currentPage"
                    :per-page="perPage" :busy="isBusy">
                    <template v-slot:table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>&nbsp;
                        <strong>Cargando</strong>
                      </div>
                    </template>
                    <template slot="tbl_plans_plan_id" slot-scope="data">{{data.item.tbl_plans_plan_id}}</template>
                    <template slot="name" slot-scope="data">{{data.item.name}}</template>
                    <template slot="state" slot-scope="data">
                      <center>
                        <b-badge :variant="fnt_get_badge(data.item.state)">
                          {{data.item.state == true ? "Activo" : "Inactivo"}}</b-badge>
                      </center>
                    </template>
                    <template slot="created_at" slot-scope="data">{{data.item.created_at | formatDate}}</template>
                    <template slot="updated_at" slot-scope="data">{{data.item.updated_at | formatDate}}</template>
                    <template slot="actions" slot-scope="data">
                      <b-button-group size="sm">
                        <b-button v-b-tooltip.hover title="Editar" variant="warning"
                          @click="fnt_send_data(data.item, data.index, $event.target)" size="sm">
                          <i class="fa fa-pencil" />
                        </b-button>

                        <b-button v-b-tooltip.hover title="Activar o Desactivar Enlace" variant="info" size="sm"
                          @click="fnt_set_status_codes(data.item, data.index, $event.target)">
                          <i :style="{color: 'green'}" class="fa fa-circle"></i>
                        </b-button>
                      </b-button-group>
                    </template>
                  </b-table>
                  <nav>
                    <b-pagination size="sm" :total-rows="fnt_get_rows(itemsInfluencers)" :per-page="perPage"
                      v-model="currentPage" />
                  </nav>
                </b-card>
              </b-tab>
              <!-- section buiness -->
              <b-tab title="Empresas">
                <b-card header-tag="header" footer-tag="footer">
                  <div slot="header">
                    <i class="icon-note" />
                    Tarjetas
                    <div class="card-header-actions">
                      <b-input-group size="sm">
                        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar">
                        </b-form-input>
                        <b-input-group-append>
                          <b-button v-b-tooltip.hover title="Limpiar" :disabled="!filter" @click="filter = ''">
                            <i class="fa fa-times" />
                          </b-button>

                          <b-button v-b-tooltip.hover title="Crear" variant="primary" size="sm"
                            @click="fnt_open_modal_business($event.target)">
                            <i class="fa fa-plus" />
                          </b-button>

                          <download-excel class="btn btn-success btn-sm" worksheet="Items" name="file.xls"
                            :data="itemsBusiness">
                            <i class="fa fa-file-excel-o"></i>
                          </download-excel>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                  <b-table responsive :hover="true" :striped="true" :bordered="true" :small="true"
                    :items="itemsBusiness" :filter="filter" :fields="fieldsBusiness" :current-page="currentPage"
                    :per-page="perPage" :busy="isBusy2">
                    <template v-slot:table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>&nbsp;
                        <strong>Cargando</strong>
                      </div>
                    </template>
                    <template slot="quantity_code_premium" slot-scope="data">
                      <center>{{data.item.quantity_code_premium === null ? 0 : data.item.quantity_code_premium }}
                      </center>
                    </template>
                    <template slot="quantity_code_basic" slot-scope="data">
                      <center>{{data.item.quantity_code_basic === null ? 0 : data.item.quantity_code_basic }}</center>
                    </template>
                    <!-- <template slot="code_adult" slot-scope="data">
                      <center>{{data.item.quantity_code_adult === null ? 0 : data.item.quantity_code_adult }}</center>
                    </template> -->
                    <template slot="quantity_code_channels_premium" slot-scope="data">
                      <center>
                        {{data.item.quantity_code_channels_premium === null ? 0 : data.item.quantity_code_channels_premium }}
                      </center>
                    </template>
                    <template slot="created_at" slot-scope="data">{{data.item.created_at | formatDate}}</template>
                    <!-- <template
                      slot="updated_at"
                      slot-scope="data"
                    >{{data.item.updated_at | formatDate}}</template>-->
                    <template slot="actions" slot-scope="data">
                      <b-button-group size="sm">
                        <b-button v-b-tooltip.hover title="Editar" variant="warning"
                          @click="fnt_send_data(data.item, data.index, $event.target)"
                          :to="{ name: 'Code', params: { email_footprint: data.item.email_footprint }}" size="sm">
                          <i class="fa fa-pencil" />
                        </b-button>

                        <!-- <b-button
                          v-b-tooltip.hover
                          title="Activar o Desactivar Enlace"
                          variant="info"
                          size="sm"
                          @click="fnt_delete_codes(data.item, data.index, $event.target)"
                        >
                          
                          <i :style="{color: 'green'}" class="fa fa-circle"></i>
                          
                          enlace desactivado black

                           enlace activado white
                          
                        </b-button> -->
                      </b-button-group>
                    </template>
                  </b-table>
                  <nav>
                    <b-pagination size="sm" :total-rows="fnt_get_rows(itemsBusiness)" :per-page="perPage"
                      v-model="currentPage" />
                  </nav>
                </b-card>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <!-- modal influencer -->
      <b-modal :id="modalInfluencers.id" :title="modalInfluencers.title" @hide="fnt_clear_modal_influencers">
        <form v-show="!modalInfluencers.hide_header" ref="form" @submit.stop.prevent="fnt_update_categories">
          <b-form-group description="Seleccione el influencer para asociar el codigo que se va a registrar."
            label="Influencer">
            <b-form-select id="selectedUsersInfluencer" v-model="selectedUsersBusiness" value-field="user_id"
              text-field="full_name" :options="usersInfluencers"></b-form-select>
          </b-form-group>
          <b-form-group description="Seleccione el plan para asociar el codigo que se va a registrar." label="Plan">
            <b-form-select id="selectedTypePlan" v-model="selectedTypePlan" value-field="plan_id" text-field="name"
              :options="plans"></b-form-select>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="activateCommission" name="check-button" switch>Activar comision</b-form-checkbox>
          </b-form-group>
          <b-form-group description="Ingrese la comision para el influencer." label="% Comision">
            <b-form-input placeholder="Comision" :disabled="!activateCommission" type="number"
              v-model="quantityCommission" required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="activateDiscount" name="check-button" switch>Activar descuento</b-form-checkbox>
          </b-form-group>
          <b-form-group description="Ingrese el descuento para el influencer." label="% Descuento">
            <b-form-input placeholder="Descuento" :disabled="!activateDiscount" type="number" v-model="quantityDiscount"
              required></b-form-input>
          </b-form-group>
          <b-form-group description="Ingrese el enlace personalizado para el influencer." label="Enlace personalizado">
            <b-row>
              <b-col md10 xs12>
                <b-form-input placeholder="Enlace personalizado (elrubios)" type="text" v-model="linkReferred" required>
                </b-form-input>
              </b-col>
              <b-col md2 xs12>
                <b-button variant="success" class="float-right" @click="fnt_generated_link">Generar Enlace</b-button>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="activateCode" name="check-button" switch>Activar enlace</b-form-checkbox>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="activateCodeDemo" name="check-button" switch>Activar registros de prueba
            </b-form-checkbox>
          </b-form-group>
        </form>
        <center v-if="modalInfluencers.hide_header">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
          <p>Registrando enlace por favor espere ...</p>
        </center>
        <template v-slot:modal-footer>
          <b-button :disabled="quantityCodes > 0 ? false : true " variant="primary" class="float-right"
            @click="fnt_register_codes('CI')">Guardar</b-button>
        </template>
      </b-modal>

      <!-- modal bussiness -->
      <b-modal :no-close-on-backdrop="true" :no-close-on-esc="true" :hide-header="modalBusiness.hide_header"
        :id="modalBusiness.id" :title="modalBusiness.title" @hide="fnt_clear_modal_business">
        <form v-show="!modalBusiness.hide_header" ref="form" @submit.stop.prevent="fnt_update_categories">
          <b-form-group description="Seleccione la empresa para asociar los codigos que se van a generar."
            label="Empresa">
            <b-form-select id="selectedUsersBusiness" v-model="selectedUsersBusiness" value-field="user_id"
              text-field="full_name" :options="usersBusiness"></b-form-select>
          </b-form-group>
          <b-form-group description="Seleccione el plan para asociar los codigos que se van a generar." label="Plan">
            <b-form-select id="selectedTypePlan" v-model="selectedTypePlan" value-field="plan_id" text-field="name"
              :options="plans"></b-form-select>
          </b-form-group>
          <b-form-group description="Ingrese la cantidad de codigos que se quiere generar." label="Cantidad">
            <b-form-input placeholder="Cantidad" type="number" v-model="quantityCodes" required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="activateCode" name="check-button" switch>Activar codigos</b-form-checkbox>
          </b-form-group>
        </form>
        <center v-if="modalBusiness.hide_header">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
          <p>Generando codigos por favor espere ...</p>
        </center>
        <template v-slot:modal-footer>

          <!-- :disabled="quantityCodes > 0 && (selectedUsersBusiness !== null) && (selectedTypePlan !== null ) ? false : true" -->

          <b-button v-show="!modalBusiness.hide_header"
            :disabled="quantityCodes > 0 && (selectedUsersBusiness !== null) && (selectedTypePlan !== null ) ? false : true"
            variant="primary" class="float-right" @click="fnt_register_codes('CT')">Generar Codigos</b-button>
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
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {    
    mixins: [validationMixin],
    mounted() {
      this.fnt_get_plans();
      this.fnt_get_types();
      this.fnt_get_users();
      this.fnt_get_codes();
    },
    data: () => {
      return {
        itemsInfluencers: [],
        itemsBusiness: [],
        fieldsInfluencers: [{
            key: "full_name",
            label: "Nombre completo",
            sortable: true
          },
          {
            key: "code",
            label: "Codigo",
            sortable: true
          },
          {
            key: "state",
            label: "Estado",
            sortable: true
          },
          {
            key: "tbl_plans_plan_id",
            label: "Tipo",
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
            label: "Opciones"
          }
        ],
        fieldsBusiness: [{
            key: "full_name",
            label: "Nombre completo",
            sortable: true
          },
          {
            key: "quantity_code_premium",
            label: "Codigos premium",
            sortable: true
          },
          {
            key: "quantity_code_basic",
            label: "Codigos basico",
            sortable: true
          },
          {
            key: "quantity_code_adult",
            label: "Codigos adulto",
            sortable: true
          },
          {
            key: "quantity_code_promocional",
            label: "Codigos Promocion",
            sortable: true
          },
          {
            key: "quantity_code_channels_premium",
            label: "Codigos canales premium",
            sortable: true
          },
          {
            key: "actions",
            label: "Opciones"
          }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        modalInfluencers: {
          id: "info-modalInfluencers",
          title: "",
          content: "",
          hide_header: false
        },
        modalBusiness: {
          id: "info-modalBusiness",
          title: "",
          content: "",
          hide_header: false
        },
        activateCode: true,
        activateCodeDemo: false,
        activateDiscount: false,
        activateCommission: false,
        filter: null,
        filterOn: [],
        types: [],
        usersBusiness: [],
        usersInfluencers: [],
        plans: [],
        codes: [],
        generatedCodes: [],
        selectedType: null,
        selectedUsersBusiness: null,
        selectedUsersInfluencers: null,
        selectedTypePlan: null,
        linkReferred: null,
        quantityCodes: 0,
        quantityDiscount: 0,
        quantityCommission: 0,
        category_id: 0,
        flag: false,
        isBusy: null,
        isBusy2: null
      };
    },
    validations: {
      form: {
        selectedUsersInfluencers: {
          required
        },
        linkReferred: {
          required
        },
        selectedTypePlan: {
          required
        }
        // name: {
        //   required,
        //   minLength: minLength(1)
        // }
      }
    },
    methods: {
      fnt_get_codes() {
        this.isBusy = true;
        axios.get("codesInfluencers").then(
          result => {
            console.log(result);
            // let nameType = this.fnt_get_name_type(
            //   "92770c16b239a8c697bbc0e36e4c92fe645537fe94cb1f5354268229b148e841"
            // );

            this.itemsInfluencers = result.data;
            this.isBusy = false;
            // .filter(e => {
            //   e.type = nameType;
            //   return true;
            // });
          },
          error => {
            fnt_toast(error, this.$bvToast);
            this.isBusy = false;
          }
        );
        this.isBusy2 = true;
        axios.get("codesBusiness").then(
          result => {
            // let nameType = this.fnt_get_name_type(
            //   "b33cb20bc4ddfd4cbcd31ccf582093b71fb08aab3e28003d3115c34c91e10f09"
            // );

            this.itemsBusiness = result.data;            
            this.isBusy2 = false;
            // .filter(element => {
            //   element.type = nameType;
            //   return true;
            // });
          },
          error => {
            fnt_toast(error, this.$bvToast);
            this.isBusy2 = false;
          }
        );
      },
      fnt_get_plans: function () {
        axios.get("plan").then(
          result => {            
            this.plans = result.data;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_get_name_type(id) {
        return this.types.find(t => t.type_id === id).name;
      },
      fnt_get_users: function () {
        this.isBusy = true;
        axios.get("usersBussiness").then(
          result => {
            this.usersBusiness = result.data;
            this.isBusy = false;
            // .filter(e => {
            //   if (e.role_id === "13b53dc5-f9b9-4275-bbf3-3617d09670ae") {
            //     e.fullName = `${e.name} ${e.lastname}`;
            //     return true;
            //   }
            // });

            this.usersInfluencers = result.data;            
            // .filter(e => {
            //   if (
            //     e.role_id === "e4e6836c-60ce-4c07-8d38-b63b171d3453" ||
            //     e.role_id === "13b53dc5-f9b9-4275-bbf3-3617d09670ae"
            //   ) {
            //     e.fullName = `${e.name} ${e.lastname}`;
            //     return true;
            //   }
            // });
          },
          error => {
            fnt_toast(error, this.$bvToast);
            this.isBusy = false;
          }
        );
      },
      fnt_get_types() {
        axios.get("types").then(
          result => {
            this.types = result.data.filter(e => e.value === "3");            
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_register_codes(short_name) {

        let type_id = this.types.find((e) => e.short_name === short_name).type_id;

        if (type_id) {
          console.log({
            quantity: this.quantityCodes,
            state: this.activateCode,
            code: this.linkReferred,
            activateCodeDemo: this.activateCodeDemo,
            quantityDiscount: this.quantityDiscount,
            quantityCommission: this.quantityCommission,
            idPlan: this.selectedTypePlan,
            idUser: this.selectedUsersBusiness || this.selectedUsersInfluencers,
            idType: type_id
          });

          // return;

          if (short_name === 'CT') {
            this.modalBusiness.hide_header = true;
          }

          if (short_name === 'CI') {
            this.modalInfluencers.hide_header = true;
          }

          axios
            .post("codes", {
              quantity: this.quantityCodes,
              code: this.linkReferred,
              state: this.activateCode,
              quantityDiscount: this.quantityDiscount,
              quantityCommission: this.quantityCommission,
              idPlan: this.selectedTypePlan,
              idUser: this.selectedUsersBusiness || this.selectedUsersInfluencers,
              idType: type_id
            })
            .then(
              result => {
                console.log(result);
                if (short_name === 'CT') {
                  this.modalBusiness.hide_header = false;
                }

                if (short_name === 'CI') {
                  this.modalInfluencers.hide_header = false;
                }

                this.fnt_get_codes();

              },
              error => {
                fnt_toast(error, this.$bvToast);
              }
            );
        }

      },
      fnt_generated_link() {
        axios.get("generatedLink").then(
          result => {
            this.linkReferred = result.data[0].link;
            // this.customLink
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_update_categories() {
        if (!this.flag) {
          axios
            .put("category/" + this.category_id, {
              name: this.name
            })
            .then(res => {
              this.flag = false;
              this.isEdit = false;
              this.fnt_get_categories();
              fnt_toast(res.data, this.$bvToast);
            })
            .catch(err => {
              fnt_toast(err, this.$bvToast);
            });
        } else {
          this.fnt_add_categories();
        }
      },
      fnt_get_rows(items) {
        return items.length;
      },
      fnt_send_data(item, index, button) {
        this.modalInfluencers.title = "Categoría";
        this.modalInfluencers.content = item;
        this.name = this.modalInfluencers.content.name;
        this.category_id = this.modalInfluencers.content.category_id;
        this.$root.$emit("bv::show::modal", this.modalInfluencers.id, button);
      },
      fnt_open_modal_influencers(button) {
        this.modalInfluencers.title = "Influencers";
        this.quantityCodes = 1;
        this.$root.$emit("bv::show::modal", this.modalInfluencers.id, button);
        this.flag = true;
      },
      fnt_clear_modal_influencers() {
        this.modalInfluencers.title = "";
        this.modalInfluencers.content = "";
        this.name = "";
        this.flag = false;
      },
      fnt_open_modal_business(button) {
        this.modalBusiness.title = "Empresas";
        this.$root.$emit("bv::show::modal", this.modalBusiness.id, button);
        this.flag = true;
      },
      fnt_clear_modal_business() {
        this.modalBusiness.title = "";
        this.modalBusiness.content = "";
        this.name = "";
        this.flag = false;
      },
      fnt_delete_codes(item, index, event) {
        console.log(item, index, event);
      },
      fnt_set_status_codes(item, index, event){           
        axios.put('codesInfluencers/'+item.code_id, {
          state: this.fnt_change_status(item)
        }).then(response => {          
          if(response.data.success){
            this.fnt_get_codes();
          }
        }).catch(err => {
          console.error(err)
        })
      },
      fnt_change_status(item){        
        if(item.state == 1){
          return 0;
        }else if(item.state == 0){
          return 1;
        }        
      },
      fnt_get_badge
    }
  };
</script>