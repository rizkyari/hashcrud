<script setup>
defineProps({
    text: String,
    type: { type: String, default: "button" },
    color: { type: String, default: "#b92f1e" },
});
</script>

<template>
    <button :style="{ backgroundColor: color }">
        {{ text }}
    </button>
</template>

<style scoped>
button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    opacity: 0.8;
}
</style>
