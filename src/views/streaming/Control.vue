<template>
  <div>
    <b-modal v-model="show" id="modal-pin" hide-footer hide-header centered no-close-on-backdrop>
      <div class="d-block">
        <div class="my-1 mb-3 text-center">
          <h5>Introduce el PIN para ver contenido restringido</h5>
        </div>
        <b-form-group class="my-1 mb-3 text-center">
          <b-input-group class="mb-3">
            <input placeholder="0" v-model="digit1" class="form-control digit" type="text" maxlength="1"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
            <input placeholder="0" v-model="digit2" class="form-control digit" type="text" maxlength="1"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
            <input placeholder="0" v-model="digit3" class="form-control digit" type="text" maxlength="1"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
            <input placeholder="0" v-model="digit4" class="form-control digit" type="text" maxlength="1"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
          </b-input-group>
          <b-link :to="{name: 'Setting'}">¿Has olvidado el PIN?</b-link>
        </b-form-group>
        <b-row>
          <b-col lg="6">
            <b-button @click="fnt_play" class="mt-3 text-center" variant="danger" block>
              <li class="fa fa-play" />&nbsp;Reproducir</b-button>
          </b-col>
          <b-col lg="6">
            <b-button :to="{name: $store.state.name}" class="mt-3 text-center" variant="primary" block>Cancelar
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import {
    fnt_toast
  } from "@/shared/utils";
  export default {
    props: {
      show: {
        required: false
      },
      item: {
        required: false
      },
      pin: {
        required: false
      }
    },
    data: () => {
      return {
        digit1: null,
        digit2: null,
        digit3: null,
        digit4: null
      };
    },
    mounted() {
      if (this.show == null || this.show == undefined || this.item == null || this.item == undefined || this.pin ==
        null || this.pin == undefined) {
        this.$router.push({
          name: this.$store.state.name
        })
      }
    },
    methods: {
      fnt_play() {
        let pin = "";
        if (this.fnt_validate_digits(this.digit1) && this.fnt_validate_digits(this.digit2) && this.fnt_validate_digits(
            this.digit3) && this.fnt_validate_digits(this.digit4)) {
          if (pin.concat(this.digit1, this.digit2, this.digit3, this.digit4) == this.pin) {
            this.$router.push({
              name: "Watch",
              params: {
                item: this.item
              }
            });
          } else {
            fnt_toast("El PIN es incorrecto", this.$bvToast);
          }
        } else {
          fnt_toast("Error en el PIN ingresado", this.$bvToast);
        }
        this.digit1 = 0;
        this.digit2 = 0;
        this.digit3 = 0;
        this.digit4 = 0;
      },
      fnt_validate_digits(value) {
        if (value >= 0 && value <= 9) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>