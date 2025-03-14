<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isScrolled = ref(false);

// Detect scroll and shrink navbar
window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 50;
});
</script>

<template>
    <nav :class="{ 'scrolled': isScrolled }">
        <div class="container">
            <h1 class="logo" @click="router.push('/')">HashCRUD</h1>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/create">Create</router-link></li>
            </ul>
        </div>
  </nav>
</template>

<style scoped>
nav {
    position: sticky;
    top: 0;
    background: #b92f1e;
    color: white;
    padding: 15px 20px;
    transition: 0.3s;
    z-index: 1000;
}

nav.scrolled {
    padding: 10px 20px;
    background: darken(#b92f1e, 10%);
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

li a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
}

li a:hover {
    color: #FFA111;
}

.logo {
    font-weight: bold;
    cursor: pointer;
}
</style>