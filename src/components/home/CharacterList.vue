<template>
  <v-container class="py-16">
    <h2 class="text-h3 text-center mb-12 font-tech gradient-text">登場角色</h2>
    <v-row>
      <v-col v-for="(char, i) in characters" :key="i" cols="12" md="4">
        <v-card class="glass-card pa-2" variant="outlined">
          <v-img height="400" :src="char.image" cover class="rounded bg-grey-darken-4"></v-img>
          <v-card-title class="mt-2">{{ char.name }}</v-card-title>
          <v-card-subtitle class="mb-4">{{ char.quote }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  defineProps(['characters']); 
</script>