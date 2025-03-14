<script setup>
import { RouterView } from 'vue-router';
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app">
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
</style>
