import React from "react";
import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";

function ExpensesRegister() {

    const storedItems = JSON.parse(localStorage.getItem('expenses'));

    const initialExpenses = [
        { id: 1, currency: "soles", "amount": 200 },
        { id: 2, currency: "soles", "amount": 20.02 },
        { id: 3, currency: "dolares", "amount": 4.01 },
        { id: 4, currency: "soles", "amount": 5.20 },
        { id: 5, currency: "soles", "amount": 1002.20 },
        { id: 6, currency: "dolares", "amount": 10 },
        { id: 7, currency: "soles", "amount": 200 },
        { id: 8, currency: "soles", "amount": 20.02 }
    ]

    const [numberId, setNumberId] = useState(9);
    const {expenses, setExpenses} = useExpenses();

    const refAmount = useRef();
    const refCurrency = useRef();

    useEffect(() => {
        if (storedItems !== null) {
            setExpenses(storedItems);
            const maxId = storedItems.reduce((max, expense) => expense.id > max ? expense.id : max, 0);
            setNumberId(maxId + 1);
        } else {
            setExpenses(initialExpenses);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const expensesList = expenses.map((expense) => <li key={expense.id}><span>{expense.currency == "soles" ? "S/." : "$"}</span>{expense.amount}<button onClick={() => handleDeleteExpense(expense.id)}>X</button></li>);

    function handleSubmitExpense(event) {
        event.preventDefault();
        setNumberId(numberId + 1);
        const expenseData = {
            id: numberId,
            currency: refCurrency.current.value,
            amount: parseFloat(refAmount.current.value),
        }
        setExpenses([...expenses, expenseData]);
        refAmount.current.value = "";
    }

    function handleDeleteExpense(id) {
        console.log(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
    }

    return (
        <div id="expense-register">
            <form action="" onSubmit={handleSubmitExpense}>
                <input ref={refAmount} id="expense" name="expense" step="0.0001" type="number" />
                <select ref={refCurrency} name="currency" defaultValue="soles">
                    <option value="soles">S/.</option>
                    <option value="dolares">$</option>
                </select>
                <input type="submit"></input>
            </form>
            <ul id="expense-list">
                {expensesList}
            </ul>
        </div>
    )
}

export default ExpensesRegister;