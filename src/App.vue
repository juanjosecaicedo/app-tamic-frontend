<template>
  <div>
    <router-view></router-view>
    <div class="vld-parent">
      <loading color="#20a8d8" background-color="#000000" :active.sync="isLoading" :can-cancel="true"
        :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    computed: {
      isLoading: {
        get: function () {
          return this.$store.state.isLoading;
        },
        set: function () {

        }
      }
    },
    created() {
      // setTimeout(() => {
      //       this.$store.state.isLoading = false
      //     }, 2000)
      socket.on('closeSession', () => {
        this.$router.push({
          name: "Main"
        });
      });
    }
  };
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import "~@coreui/icons/css/coreui-icons.min.css";
  /* Import Font Awesome Icons Set */
  $fa-font-path: "~font-awesome/fonts/";
  @import "~font-awesome/scss/font-awesome.scss";
  /* Import Simple Line Icons Set */
  $simple-line-font-path: "~simple-line-icons/fonts/";
  @import "~simple-line-icons/scss/simple-line-icons.scss";
  /* Import Flag Icons Set */
  @import "~flag-icon-css/css/flag-icon.min.css";
  /* Import Bootstrap Vue Styles */
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  // Import Main styles for this application
  @import "assets/scss/style";
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
