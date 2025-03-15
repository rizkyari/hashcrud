<script setup>
import { computed, ref } from 'vue';
import { useInvoiceStore } from '../store/invoiceStore';
import { useThemeStore } from '../store/themeStore';
import { validateInvoiceForm } from '../utils/validation';
import Modal from '../components/Modal.vue';

const themeStore = useThemeStore();
const invoiceStore = useInvoiceStore();
const invoices = computed(() => invoiceStore.invoices);

const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedInvoice = ref(null);
const errors = ref({});

const validateForm = () => {
  errors.value = validateInvoiceForm(selectedInvoice.value.name, selectedInvoice.value.amount);
};

const openEditModal = (invoice) => {
  selectedInvoice.value = { ...invoice };
  showEditModal.value = true;
};

const openDeleteModal = (invoice) => {
  selectedInvoice.value = { ...invoice };
  showDeleteModal.value = true;
};

const handleUpdateInvoice = () => {
  if (Object.keys(errors.value).length === 0) {
    invoiceStore.updateInvoice(selectedInvoice.value);
    showEditModal.value = false;
  }
};

const deleteInvoice = () => {
  if (!selectedInvoice.value || !selectedInvoice.value.id) return; // Prevent undefined issues
  invoiceStore.deleteInvoiceById(selectedInvoice.value.id);
  showDeleteModal.value = false;
};
</script>

<template>
    <div class="home" :class="{'dark': themeStore.isDarkMode}">
        <h2>Invoices</h2>
        <router-link to="/create">
            <button class="add-button">+ Add Invoice</button>
        </router-link>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in invoices" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.status }}</td>
                        <td>Rp.{{ item.amount }},-</td>
                        <td class="action-buttons">
                            <button @click="openEditModal(item)">Edit</button>
                            <button @click="openDeleteModal(item)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal v-if="showEditModal" title="Edit Invoice" @close="showEditModal = false">
            <form @submit.prevent="handleUpdateInvoice" class="modal-form">
                <div class="form-group">
                    <label for="name">Invoice Name</label>
                    <input v-model="selectedInvoice.name" type="text" id="name" placeholder="Enter invoice name" @input="validateForm" />
                    <p v-if="errors.name" class="error">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input v-model="selectedInvoice.amount" type="number" id="amount" placeholder="Enter amount" @input="validateForm" />
                    <p v-if="errors.amount" class="error">{{ errors.amount }}</p>
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                        <select v-model="selectedInvoice.status" id="status">
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                </div>
                <div class="modal-actions">
                    <button type="submit" :disabled="Object.keys(errors).length > 0">Save Changes</button>
                    <button type="button" @click="showEditModal = false">Cancel</button>
                </div>
            </form>
        </Modal>

        <Modal v-if="showDeleteModal" title="Confirm Deletion" confirmText="Yes, Delete" @confirm="deleteInvoice" @close="showDeleteModal = false">
            <p>Are you sure you want to delete this invoice?</p>
        </Modal>
    </div>
</template>

<style scoped>
.home {
    padding: 20px;
    max-width: 100vw;
    overflow-x: hidden;
}

h2 {
    color: #212529;
}

.add-button {
    background: #FFA111;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    display: inline-block;
    cursor: pointer;
}

.table-container {
    width: 100%;
    overflow-x: auto;
    display: block;
    max-width: 100%;
}

.table-container table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    white-space: nowrap;
}

th {
    background: #2A2A30;
    color: white;
}

.action-buttons {
    display: flex;
    gap: 5px;
}

.error {
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    transition: 0.3s;
}

button[type="submit"] {
    background: #b92f1e;
    color: white;
}

button[type="button"] {
    background: #ccc;
    color: black;
}

.dark {
    color: #FFA111;
}

.dark h2{
    color: #FFA111;
}
@media (max-width: 768px) {
    .table-container {
        overflow-x: auto;
    }

    .table-container table {
        font-size: 0.9rem;
    }

    .action-buttons {
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 100%;
        margin-top: 5px;
    }

    .home {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .home h2 {
        font-size: 1.2rem;
    }

    .table-container table {
        font-size: 0.8rem;
    }
}
</style>
