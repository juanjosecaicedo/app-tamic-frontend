<template>
  <div class="form_search">
    <form autocomplete="off" @submit.prevent>
      <label for="search" class="visuallyhidden">Buscar</label>
      <div class="field_search">
        <input id="search" name="search" type="text" v-model.trim="query" placeholder="Buscar" @keyup="goToRoute"
          @blur="unFocus" />
        <button type="button" aria-label="Close" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
            <g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5">
              <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
            </g>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        query: this.$route.query.value ? this.$route.query.value : ""
      };
    },
    methods: {
      goToRoute() {
        if (this.query) {
          this.$store.state.value = this.query;
          this.$router.push({
            name: "Search",
            query: {
              value: this.query
            }
          });
        } else {
          this.$router.push({
            name: this.$store.state.name
          });
        }
      },
      goBack() {
        this.query = "";
        this.$store.state.isVisible = false;
        this.$router.push({
          name: this.$store.state.name
        });
      },
      unFocus() {
        this.goToRoute();
      }
    }
  };
</script>