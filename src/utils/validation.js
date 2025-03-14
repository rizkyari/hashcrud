export function validateInvoiceForm(name, amount) {
    const errors = {};
  
    if (!name.trim()) {
      errors.name = "Invoice name is required.";
    }
  
    if (!amount || amount <= 0) {
      errors.amount = "Amount must be greater than zero.";
    }
  
    return errors;
}