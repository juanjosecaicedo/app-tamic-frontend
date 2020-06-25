<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show.form" class='mb-2'>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-1" label="Empresa:" label-for="input-1">
            <b-form-select
              id="input-1"
              v-model="form.business"
              :options="business"
              @change="fnt_get_plans_influencer()"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
           <b-form-group id="input-group-2" label="Plan:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.plan"
              :options="plans"
              :disabled="!show.select_plans"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-3" label="Nombres:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.name"
              required
              placeholder="Nombres"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-4" label="Apellidos:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.lastname"
              required
              placeholder="Apellidos"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group
            id="input-group-5"
            label="Correo eléctronico:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="form.email"
              type="email"
              required
              placeholder="Correo eléctronico"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-6" label="Clave:" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.clave"
              required
              placeholder="Clave"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col sm="3">
          <b-form-group id="input-group-7" label="Telefono:" label-for="input-7">
            <b-form-input
              id="input-7"
              v-model="form.phone"
              required
              placeholder="Telefono"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="3">
           <b-form-group id="input-group-7" label="Genero:" label-for="input-7">
            <b-form-select
              id="input-1"
              v-model="form.gender"
              :options="gender"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-8" label="Tipo de documento:" label-for="input-8">
            <b-form-select
              id="input-8"
              v-model="form.document_type"
              :options="document_types"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-9" label="Identificación:" label-for="input-9">
            <b-form-input
              id="input-9"
              v-model="form.identification"
              required
              placeholder="Identificación"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-10" label="Dirección:" label-for="input-10">
            <b-form-input
              id="input-10"
              v-model="form.address"
              required
              placeholder="Direccion"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-11" label="Pais:" label-for="input-11">
            <b-form-select
              id="input-11"
              v-model="form.country"
              :options="countries"
              @change="fnt_filter_cities"
              :disabled="true"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-12" label="Ciudad:" label-for="input-12">
            <b-form-select
              id="input-12"
              v-model="form.city"
              :options="cities"
              :disabled="!show.select_cities"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!--b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group-->

      <b-button type="submit" variant="primary">Crear</b-button>
      <!--b-button type="reset" variant="danger">Reset</b-button-->
    </b-form>
  </div>
</template>
<script>
  import {
    fnt_toast
  } from "@/shared/utils";
  export default {
    name: "RegisterUser",
    beforeCreate: function () {
      document.body.className =
        "dashboard sidebar-lg-show header-fixed sidebar-fixed";
    },
    async mounted() {
      this.fnt_get_user_business();
      this.fnt_start_data_form();
    },
    components: {
      
    },
    data: () => {
      return {
        form: {
          email: '',
          name: '',
          lastname:'',
          business:null,
          plan:null,
          gender:null,
          address:null,
          clave:null,
          phone:null,
          document_type:'6e643417-b945-4021-b531-037217f26d62',
          city:'794c2237-3f2d-4d53-99fd-d9305e564c1e',
          country:'d6b6d3e4-9f54-4a0f-97f9-a94dcfb3129a',
          identification:null
        },
        business: [{ text: 'Seleccione empresa', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        plans:[{text:'Seleccione plan', value:null}, {text:'Plan 1', value:1}],
        document_types: [],
        cities_array: [],
        cities: [],
        gender: [{text:'Seleccione Genero',value:null},{text:'Masculino',value:'Masculino'},{text:'Femenino',value:'Femenino'},{text:'Indefinido',value:'Indefinido'}],
        countries: [],
        categories: [],
        show:{
          form:true,
          select_plans:false,
          select_cities:false
        }
      };
    },
    methods: {
      async fnt_start_data_form(){
        await Promise.all([
          axios.get("country"),
          axios.get("city"),
          axios.get("types")
        ]).then(([resultCountry, resultCity, resultType]) => {
          console.log(resultCountry, resultCity, resultType);
          let array_country = [{text:"Seleccione pais", value: null}];
          let array_city = [{text:"Seleccione ciudad", value: null}];
          let array_document_type = [{text:"Seleccione documento", value: null, selected:true}];

          this.countries = array_country.concat(resultCountry.data.filter(item => {item.text = item.name; item.value = item.country_id; return true;}));
          this.cities = array_city.concat(resultCity.data.filter(item => {item.text = item.name; item.value = item.city_id; return true;}));
          this.cities_array = array_city.concat(resultCity.data.filter(item => {item.text = item.name; item.value = item.city_id; return true;}));
          this.document_types = array_document_type.concat(resultType.data.filter(item => {if(item.value == "1"){item.text = item.name; item.value = item.type_id; return true;}}));
          //filtra las ciudades por defecto en colombia
          this.fnt_filter_cities('794c2237-3f2d-4d53-99fd-d9305e564c1e');
        });
      },
      fnt_filter_cities(id = null){
        console.log('fnt_filter_cities');
        this.show.select_cities = false;

        let array_city = [{text:"Seleccione ciudad", value: null}];

        this.cities = array_city.concat(this.cities_array.filter(item => item.tbl_countries_country_id === this.form.country));

        this.form.city = id;

        this.show.select_cities = true;
      },
      fnt_get_user_business(){
         axios.get("getInfluencers").then(
          result => {
            let empresa = [{ text: 'Seleccione empresa', value: null }];
            
            console.log(empresa.concat(result.data));
            this.business = empresa.concat(result.data);
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      fnt_get_plans_influencer(){
        console.log('fnt_get_plans_influencer',{user_id:this.form.business});
        this.show.select_plans = false;
         axios.post("getPlansInfluencers",{user_id:this.form.business}).then(
          result => {
            let planes = [{ text: 'Seleccione plan', value: null }];
            
            console.log(planes.concat(result.data));
            this.plans = planes.concat(result.data);
            this.show.select_plans = true;
            this.form.plan = null;
          },
          error => {
            fnt_toast(error, this.$bvToast);
          }
        );
      },
      onSubmit(evt) {
        evt.preventDefault()
    
        let array = this.form.plan.split(':');
        let obj = {user_name: this.form.name,
                user_lastname: this.form.lastname,
                user_email: this.form.email,
                password: this.form.clave,
                key_code: array[1],
                phone: this.form.phone,
                gender: this.form.gender,
                document_type: this.form.document_type,
                identification: this.form.identification,
                address: this.form.address,
                city_id: this.cities_array.find(item => item.city_id === this.form.city).city_id,
                city_name: this.cities_array.find(item => item.city_id === this.form.city).name,
                plan_id: array[0],
                code_id: array[1],
                plan_value: array[2]};
      
      axios.post('createService',obj).then(response =>{
        console.log(response);
        if(response.data[0].response === 5){
          fnt_toast("El correo ya existe", this.$bvToast);
        }else if(response.data[0].response === 1){
            fnt_toast("cuenta registrada correctamente", this.$bvToast);
            this.form.name = null;
            this.form.lastname = null;
            this.form.email = null;
            this.form.clave = null;
            this.form.phone = null;
            this.form.gender = null;
            this.form.document_type = '6e643417-b945-4021-b531-037217f26d62';
            this.form.city = '794c2237-3f2d-4d53-99fd-d9305e564c1e';
            this.form.identification = null;
            this.form.address = null;
      
        }else{
           fnt_toast("Error al registrar la cuenta", this.$bvToast);
        }
      });
                console.log(obj);
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  };
</script>