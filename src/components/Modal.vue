<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal">
            <slot></slot>
            <div class="modal-actions">
                <button v-if="confirmText" @click="$emit('confirm')">{{ confirmText }}</button>
                <button v-if="useCancel" @click="$emit('close')">Cancel</button>
            </div>
        </div>
    </div>
  </template>
  
<script setup>

defineProps({
  title: String,
  confirmText: String,
  useCancel: Boolean
});

</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-in-out;
}
  
button {
    background: #b92f1e;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}
  
button:hover {
    opacity: 0.8;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>