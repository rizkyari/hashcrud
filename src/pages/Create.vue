<script setup>
import Modal from '../components/Modal.vue';
import { useInvoiceStore } from '../store/invoiceStore';
import { ref } from 'vue';
import { validateInvoiceForm } from '../utils/validation';
import { useRouter } from 'vue-router';

const invoiceStore = useInvoiceStore();
const router = useRouter();

const name = ref('');
const amount = ref('');
const status = ref('Paid');
const showModal = ref(false);
const errors = ref({});


const validateForm = () => {
  errors.value = validateInvoiceForm(name.value, amount.value);
};

const handleSave = () => {
  validateForm();
  if (Object.keys(errors.value).length > 0) return;

  invoiceStore.addInvoice({
    name: name.value,
    amount: amount.value,
    status: status.value,
  });

  showModal.value = true;
};

const confirmSave = () => {
  showModal.value = false;
  router.push('/');
};

</script>

<template>
    <div class="create-page">
      <h2>Add New Invoice</h2>
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label for="name">Invoice Name</label>
          <input v-model="name" type="text" id="name" placeholder="Enter invoice name" @input="validateForm" />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input v-model="amount" type="number" id="amount" placeholder="Enter amount" @input="validateForm" />
          <p v-if="errors.amount" class="error">{{ errors.amount }}</p>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="status" id="status">
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <button type="submit" :disabled="Object.keys(errors).length > 0">Save</button>
      </form>
  
      <Modal v-if="showModal" @close="confirmSave">
        <p>Invoice Successfully Created!</p>
        <button @click="confirmSave">OK</button>
      </Modal>
    </div>
</template>
  
<style scoped>
.create-page {
    padding: 20px;
}
  
h2{
    color: #212529;
}
  
.form-group {
    margin-bottom: 15px;
}
  
label{
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}
  
input,select{
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
  
button {
    background: #b92f1e;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>