<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <div class="float-left display-3 mr-4"><img width="150" heigth="100" src="img/brand/logo.svg" alt="Logo" />
            </div>
            <h4 class="pt-3">Transacción {{title}}</h4>
            <p class="text-muted">{{description}}</p>
          </div>
          <br />
          <div align="center">
            <b-col md="8">
              <b-button block variant="info" @click="fnt_back()">Volver</b-button>
            </b-col>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  export default {
    beforeCreate: function () {
      document.body.className = "transaction";
    },
    mounted() {
      this.fnt_get_data();
    },
    data: () => {
      return {
        title: "",
        description: ""
      };
    },
    methods: {
      fnt_get_data() {
        if (this.$route.query.state == null) {
          this.title = "rechazada";
        } else {
          this.title = this.$route.query.state;
        }
        this.description = "Por favor, intentar nuevamente la transacción";
      },
      fnt_back() {
        if (localStorage.sessionData == null || localStorage.sessionData == undefined) {
          this.$router.push({
            name: "Login"
          });
        } else {
          this.$router.push({
            name: "Setting"
          });
        }
      }
    }
  }
</script>