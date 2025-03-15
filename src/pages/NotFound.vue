<script setup>
import { useRouter } from 'vue-router';
import { useThemeStore } from '../store/themeStore';

const router = useRouter();
const themeStore = useThemeStore();
</script>

<template>
  <div class="not-found" :class="{ dark: themeStore.isDarkMode }">
    <h1>404</h1>
    <p>Oops! The page you are looking for doesn't exist.</p>
    <button @click="router.push('/')" class="home-button">Go Home</button>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

h1 {
  font-size: 5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #555;
}

.home-button {
  margin-top: 20px;
  background: #b92f1e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.home-button:hover {
  background: #9e2617;
}

.dark .not-found {
  background: #222;
  color: white;
}

.dark p {
  color: #ccc;
}

.dark .home-button {
  background: #444;
  color: #FFA111;
}

.dark .home-button:hover {
  background: #555;
}
</style>
