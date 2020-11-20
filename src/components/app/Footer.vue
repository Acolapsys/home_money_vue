<template>
  <v-footer dark padless app inset>
    <v-card class="flex" flat tile color="orange" :elevation="10">
      <v-card-text class="white--text py-2 text-center">
        <v-icon left>mdi-copyright</v-icon>{{ new Date().getFullYear() }} -
        <strong> Acolapsys</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {};
</script>
