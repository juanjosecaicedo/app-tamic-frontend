<template>
  <div id="view">
    <div id="layout">
      <div>
        <DefaultNav />
        <main class="main">
          <router-view></router-view>
        </main>
        <div class="d-md-none" style="margin: 60px"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import DefaultNav from "./DefaultNav";
  export default {
    components: {
      DefaultNav
    }
  };
</script>