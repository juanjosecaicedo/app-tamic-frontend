<template>
  <b-modal v-model="show" hide-footer hide-header centered no-close-on-backdrop>
    <div class="d-block text-center">
      <div class="mb-2"></div>
      <h3>Servicios</h3>
      <p>No tienes ningún servicio activado en Tamic</p>
      <b-button class="mt-3 text-center" variant="outline-primary" block :to="{name: 'Setting'}">¡Activar ahora!
      </b-button>
    </div>
  </b-modal>
</template>
<script>
  export default {
    props: {
      show: {
        required: true
      }
    }
  };
</script>