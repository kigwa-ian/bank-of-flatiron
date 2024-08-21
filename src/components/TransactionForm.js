import React, { useState } from 'react';

function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    type: '',
    description: '',
    amount: 0
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewTransaction({ ...formData, id: Date.now() });
    setFormData({
      id: '',
      date: '',
      type: '',
      description: '',
      amount: 0
    });  // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="date" value={formData.date} onChange={handleInput} type="date" />
      <input name="type" value={formData.type} onChange={handleInput} placeholder="Type" />
      <input name="description" value={formData.description} onChange={handleInput} placeholder="Description" />
      <input name="amount" value={formData.amount} onChange={handleInput} type="number" placeholder="Amount" />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
