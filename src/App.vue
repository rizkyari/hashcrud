<script setup>
import { RouterView } from 'vue-router';
import { useThemeStore } from '../src/store/themeStore';

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const themeStore = useThemeStore();
</script>

<template>
  <div id="app" :class="{'dark': themeStore.isDarkMode}">
    <Navbar/>
    <main>
        <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
main {
  padding: 20px;
  min-height: 80vh;
}

.dark {
    background-color: #3F3F3F;
}
</style>
