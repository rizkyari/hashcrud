<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../store/themeStore';

const router = useRouter();
const themeStore = useThemeStore();
const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Detect scroll and shrink navbar
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
    <nav :class="{ 'scrolled': isScrolled, 'dark': themeStore.isDarkMode }">
        <div class="container">
            <h1 class="logo" @click="router.push('/')">HashCRUD</h1>
            <button class="burger-menu" @click="toggleMenu">☰</button>
            <ul class="main-menu" :class="{ 'open': isMenuOpen }">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/create">Create</router-link></li>
                <li>
                    <button class="theme-toggle" :class="{ 'dark-mode-btn': themeStore.isDarkMode }" @click="themeStore.toggleTheme">
                        {{ themeStore.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
                    </button>
                </li>
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
    background: #9e2617;
}

.dark nav {
    background: #222;
    color: #fff;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-menu {
    display: flex;
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

.dark li a {
    color: #FFA111;
}

.logo {
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
}

.theme-toggle {
    background: #444;
    color: #FFA111;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease, color 0.3s ease;
}

.dark-mode-btn {
    background: #fff;
    color: #FFA111;
}

.burger-menu {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

@media (max-width: 768px) {
    .burger-menu {
        display: block;
    }
    
    .main-menu {
        position: absolute;
        top: 60px;
        right: 0;
        background: #b92f1e;
        width: 100%;
        flex-direction: column;
        align-items: center;
        display: none;
        padding: 15px 0;
    }
    
    .main-menu.open {
        display: flex;
    }
    
    li {
        padding: 10px 0;
    }
}
</style>
