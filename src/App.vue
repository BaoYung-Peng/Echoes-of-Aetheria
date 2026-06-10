<template>
  <v-app class="bg-black">
    <Navbar />
    <v-main>
      <router-view /> </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>