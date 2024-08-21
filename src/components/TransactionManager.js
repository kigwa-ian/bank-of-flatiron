import React, { useState } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');  // Changed default to 'All'
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleNewTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const processedTransactions = transactions
    .filter(transaction => 
      (typeFilter === 'All' || transaction.type === typeFilter) &&
      transaction.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const compareA = sortField === 'amount' ? parseFloat(a[sortField]) : a[sortField];
      const compareB = sortField === 'amount' ? parseFloat(b[sortField]) : b[sortField];
      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div>
      <TransactionForm onNewTransaction={handleNewTransaction} />
      <input
        type="text"
        value={filter}
        onChange={onFilterChange}
        placeholder="Search by description"
      />
      <select onChange={handleTypeChange} value={typeFilter}>
        <option value="All">All</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Fashion">Fashion</option>
        <option value="Gift">Gift</option>
        <option value="Transportation">Transportation</option>
        <option value="Housing/Rent">Housing/Rent</option>
      </select>
      <button onClick={() => handleSort('description')}>Sort by Description</button>
      <button onClick={() => handleSort('type')}>Sort by Type</button>
      <button onClick={() => handleSort('amount')}>Sort by Amount</button>
      <TransactionList transactions={processedTransactions} onTypeChange={handleTypeChange} />
    </div>
  );
}

export default TransactionManager;
