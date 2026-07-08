<template>
  <v-app-bar flat class="glass-nav" color="transparent">
    <v-toolbar-title class="font-weight-black gradient-text">Echoes of Aetheria</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" to="/">首頁</v-btn>
    <v-btn variant="text" to="/gameplay">玩法介紹</v-btn>
    <v-btn variant="text" to="/theWorldView">世界觀</v-btn>
    <v-btn variant="text" to="/dimension-switch">次元切換</v-btn>
    <v-btn variant="text" to="/gameplan">測試演示</v-btn>
    <v-btn variant="text" to="/resume">履歷</v-btn>
    
  </v-app-bar>
</template>

<style scoped>
.glass-nav { backdrop-filter: blur(10px); background: rgba(0, 0, 0, 0.5) !important; }
.gradient-text { background: linear-gradient(90deg, #6B4CFF, #00FFC6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
</style>
