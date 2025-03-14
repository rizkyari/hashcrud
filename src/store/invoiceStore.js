import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const invoices = ref([
        { id: 1, name: 'Invoice #123', status: 'Paid', amount: '1500' },
        { id: 2, name: 'Invoice #124', status: 'Pending', amount: '2000' },
        { id: 3, name: 'Invoice #125', status: 'Unpaid', amount: '20000' },
    ]);

    const addInvoice = (invoice) => {
        invoices.value.push({
            id: invoices.value.length + 1,
            ...invoice,
        });
    };

    const updateInvoice = (updatedInvoice) => {
        const index = invoices.value.findIndex(i => i.id === updatedInvoice.id);
        if (index !== -1) invoices.value[index] = { ...updatedInvoice };
      };
    

    const deleteInvoiceById = (id) => {
        invoices.value = invoices.value.filter((invoice) => invoice.id !== id);
    };

    return { invoices, addInvoice, updateInvoice, deleteInvoiceById };
});
