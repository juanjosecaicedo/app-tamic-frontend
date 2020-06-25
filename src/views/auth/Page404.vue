<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">¡Uy! Estas perdido.</h4>
            <p class="text-muted">No se encontró la página que está buscando.</p>
          </div>
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-search"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <input id="prependedInput" class="form-control" size="16" type="text" placeholder="¿Qué estás buscando?" />
            <b-input-group-append>
              <b-button variant="info" @click="fnt_back()">Buscar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  export default {    
    beforeCreate: function () {
      document.body.className = "404";
    },
    methods: {
      fnt_back() {
        this.$router.push({
          name: "Login"
        })
      }
    }
  };
</script>