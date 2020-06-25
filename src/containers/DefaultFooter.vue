<template>
  <TheFooter>
    <div>
      <a href="#">Tamic</a>
      <span class="ml-1">&copy; {{date}}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Desarrollado por</span>
      <a href="#">Tamic</a>
    </div>
  </TheFooter>
</template>

<script>
  import {
    Footer as TheFooter
  } from "@coreui/vue";
  export default {
    data: () =>{
      return {
        date: null
      }
    },
    name: "DefaultFooter",
    components: {
      TheFooter
    },
    mounted(){
      this.date = new Date().getFullYear()      
    }
  };
</script>