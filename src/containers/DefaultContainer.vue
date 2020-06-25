<template>
  <div class="app">
    <DefaultHeader />
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <DefaultFooter />
  </div>
</template>
<script>
  import nav from "@/_nav";
  import {
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    Breadcrumb
  } from "@coreui/vue";
  import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
  import DefaultHeader from "./DefaultHeader";
  import DefaultFooter from "./DefaultFooter";
  import AxiosPublic from "axios";
  export default {
    name: "DefaultContainer",
    components: {
      AppSidebar,
      AppAside,
      Breadcrumb,
      DefaultHeaderDropdownAccnt,
      SidebarForm,
      SidebarFooter,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer,
      DefaultFooter,
      DefaultHeader
    },
    beforeCreate: function () {
      axios.post('permission').then((res) => {
        if (res.status === 200) {
          if (res.data.rol_id !== 'c1a0761a-09a5-4cdd-b213-ec4639c55c06' && res.data.rol_id !== null && res.data
            .rol_id !== '' && res.data.rol_id !== undefined) {
            this.nav = nav.items.filter(element => {
              if (element.permissions) {
                if (element.permissions.find(e => e.code === res.data.rol_id)) {
                  return element;
                }
              }
            });
          } else {
            this.$router.push({
              name: "Login"
            });
          }
        } else {
          this.$router.push({
            name: "Login"
          });
        }
      });
    },
    data() {
      return {
        nav: []
      };
    },
    computed: {
      name() {
        return this.$route.name;
      },
      list() {
        return this.$route.matched.filter(
          route => route.name || route.meta.label
        );
      }
    }
  };
</script>