import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartComponent = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  const calculateTotalAmount = (type) => {
    return expenses.reduce((total, expense) => {
      if (expense.transactionType === type) {
        return total + parseFloat(expense.amount);
      }
      return total;
    }, 0);
  };

  const totalDebit = calculateTotalAmount('debit');
  const totalCredit = calculateTotalAmount('credit');
  const totalAmount = totalDebit + totalCredit;

  const data = [
    { name: 'Debit', value: Math.round((totalDebit / totalAmount) * 100) },
    { name: 'Credit', value: Math.round((totalCredit / totalAmount) * 100) },
  ];

  return (
    <ResponsiveContainer width="100%" height={800}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={240}
          fill="#8884d8"
          label
        />
        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
