<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset"  class='mb-2'>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-3" label="Correo eléctronico:" label-for="input-3">
            <b-form-input id="input-3" v-model="email" required placeholder="Correo eléctronico"></b-form-input>
          </b-form-group>
          
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-2" label="Plan:" label-for="input-2">
            <b-form-select id="input-2" v-model="plan" :options="plans" :disabled="!email.length > 0 || code.length > 0" >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group id="input-group-3" label="Codgio Tarjeta:" label-for="input-3">
            <b-form-input id="input-3" style="text-transform:uppercase;" :disabled="plan.value !== null" v-model="code" placeholder="Codigo de tarjeta aqui"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <h5>Descripción: </h5>
          <p>{{this.plan.description}}</p>
          
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-button :disabled="!email.length > 0 ? true : code.length > 0 ? false : plan.value === null ? true : false" type="submit" variant="primary">Crear Servicio</b-button>
        </b-col>
        <b-col sm="6">
     
        </b-col>
      </b-row>

    </b-form>
  </div>
</template>
<script>
  import {
    fnt_toast
  } from "@/shared/utils";
  export default {
    beforeCreate: function () {
      document.body.className =
        "dashboard sidebar-lg-show header-fixed sidebar-fixed";
    },
    async mounted() {
      //this.fnt_get_user_business();
      //this.fnt_start_data_form();
      this.fnt_get_plans();
    },
    components: {

    },
    data: () => {
      return {
        email:"",
        code:"",
        plan:{value: null,
          description: "Seleccione un plan"},
        plans: [{
          text: 'Seleccione plan',
          value: {value: null,
          description: "Seleccione un plan"}
        }]
      };
    },
    methods: {
      
      async fnt_get_plans() {
        this.isBusy = true;
        axios.get("plan").then(
          result => {
            
            this.items = result.data;
            result.data.forEach(element => {
              this.plans.push( {text: element.name, value: {value: element.plan_id, description: element.description, plan_value: element.value}});
            });
            
            this.isBusy = false;
          },
          error => {
            fnt_toast(error, this.$bvToast);
            this.isBusy = false;
          }
        );

      },
      onSubmit(evt) {
        evt.preventDefault()

        let obj = {};
        if (this.code !== "" && this.code !== null){
          obj = {
            email: this.email,
            plan_id: null,
            code: this.code,
            plan_value: null
          };
        }
        
        if(this.plan.value !== "" && this.plan.value !== null && this.code === "" || this.code === null){
          obj = {
            email: this.email,
            plan_id: this.plan.value,
            code: null,
            plan_value: this.plan.plan_value
          };
        }

        axios.post('createServicePlan', obj).then(response => {
          console.log(response);
          if (response.data[0].response === 5) {
            fnt_toast("El codigo no existe", this.$bvToast);
          } else if (response.data[0].response === 1) {
            fnt_toast("Servicio registrado correctamente", this.$bvToast);
            this.email = "";
            this.code = "";
            this.plan = {
              value: null,
              description: "Seleccione un plan"};
          } else if (response.data[0].response === 3) {
            fnt_toast("El correo no existe", this.$bvToast);

          } else {
            fnt_toast("Error al registrar el servicio", this.$bvToast);
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