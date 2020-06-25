<template>
  <div>
    <div class="nav_bar">
      <b-card style="border-radius: 0; margin: 0 !important" no-body>
        <b-tabs pills card vertical>
          <b-tab>
            <template slot="title">
              <i class="icon-user"></i>&nbsp;
              Perfil
            </template>
            <DefaultProfile />
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-basket-loaded"></i>&nbsp;
              Facturación
            </template>
            <DefaultBilling :active="true" payment="Epayco" :back="true" />
          </b-tab>
          <b-tab :active="isPayment">
            <template slot="title">
              <i class="icon-bag"></i>&nbsp;
              Planes
            </template>
            <DefaultBilling :active="false" payment="Epayco" :back="false" />
          </b-tab>
          <b-tab @click="fnt_logout">
            <template slot="title">
              <i class="icon-logout"></i>&nbsp;
              Cerrar sesión
            </template>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>
  import DefaultBilling from "./containers/DefaultBilling";
  import DefaultProfile from "../base/Profile";
  export default {
    name: "Search",
    components: {
      DefaultBilling,
      DefaultProfile
    },
    computed: {
      isPayment() {
        return this.$store.state.payment;
      }
    },
    created() {
      if (JSON.parse(localStorage.sessionData).activeServices < 1) {
        this.$store.state.payment = true;
      } else {
        this.$store.state.payment = false;
      }
    },
    beforeDestroy() {
      setTimeout(() => {
        console.log('Destruye componente Settings.vue');
        socket.emit('clear_code_invoice');
      }, 10000);
    },
    methods: {
      fnt_logout: function () {
        localStorage.clear();
        axios.delete('/deleteSession');
        this.$router.push({
          name: "Login"
        });
      }
    }
  };
</script>