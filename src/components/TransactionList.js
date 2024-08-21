import React from 'react';

function TransactionList({ transactions, onTypeChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type 
            <select onChange={onTypeChange} style={{ marginLeft: '10px' }}>
              <option value="All">All</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
              <option value="Gift">Gift</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing/Rent">Housing/Rent</option>
            </select> 
          </th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.type}</td>
            <td>{transaction.description}</td>
            <td>${transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;
