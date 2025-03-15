import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        localStorage.setItem('darkMode', isDarkMode.value);
        document.body.classList.toggle('dark-mode', isDarkMode.value);
    };

    // Apply the theme on initial load
    if (isDarkMode.value) {
        document.body.classList.add('dark-mode');
    }

    // Watch for changes and update body class
    watch(isDarkMode, (newValue) => {
        if (newValue) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    return { isDarkMode, toggleTheme };
});
