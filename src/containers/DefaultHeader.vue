<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" :to="{name: 'Home'}">
      <img class="navbar-brand-full" src="img/brand/logo.svg" width="auto" height="20" alt="Logo" />
      <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="25" height="25" alt="Logo" />
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
    <b-navbar-nav class="ml-auto">
      <DefaultHeaderDropdownAccnt />
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
  import {
    Header as AppHeader,
    SidebarToggler,
    AsideToggler
  } from "@coreui/vue";
  import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
  export default {
    name: "DefaultHeader",
    components: {
      AsideToggler,
      AppHeader,
      DefaultHeaderDropdownAccnt,
      SidebarToggler
    }
  };
</script>