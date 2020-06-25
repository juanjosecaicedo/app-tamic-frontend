<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img src="img/avatars/user.jpg" class="img-avatar" alt="Profile" />
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>Cuenta</strong>
      </b-dropdown-header>
      <b-dropdown-item @click="fnt_profile">
        <i class="fa fa-user" /> Perfil
      </b-dropdown-item>
      <b-dropdown-item @click="fnt_logout">
        <i class="fa fa-lock" /> Cerrar sesión
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>
<script>
  import {
    HeaderDropdown as AppHeaderDropdown
  } from "@coreui/vue";
  export default {
    name: "DefaultHeaderDropdownAccnt",
    components: {
      AppHeaderDropdown
    },
    methods: {
      fnt_logout: function () {
        axios.delete('/deleteSession').then((response) => {
          localStorage.clear();
          this.$router.push({
            name: "Login"
          });
        });
      },
      fnt_profile: function () {
        this.$router.push({
          name: "Profile"
        });
      }
    }
  };
</script>