import React from "react";
import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";

function ExpensesRegister() {

    const storedItems = JSON.parse(localStorage.getItem('expenses'));

    const initialExpenses = [
        { id: 1, currency: "soles", category: "alimentacion", "amount": 200 },
        { id: 2, currency: "soles", category: "compras", "amount": 20.02 },
        { id: 3, currency: "soles", category: "pasajes", "amount": 4.01 },
        { id: 4, currency: "soles", category: "sin categoria", "amount": 5.20 },
        { id: 5, currency: "soles", category: "sin categoria", "amount": 1002.20 },
        { id: 6, currency: "soles", category: "sin categoria", "amount": 10 },
        { id: 7, currency: "soles", category: "sin categoria", "amount": 200 },
        { id: 8, currency: "soles", category: "sin categoria", "amount": 20.02 }
    ]

    const [numberId, setNumberId] = useState(9);
    const [isDetailShown, setIsDetailShown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedId, setSelectedId] = useState("");

    const { expenses, setExpenses } = useExpenses();

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

    const expenseDetail = (
        <div id="expense-detail-wrapper">
            <header>
                <p>Categoría:</p><button onClick={handleCloseDetail}>X</button>
            </header>
            <ul>
                <li>
                    <input id="alimentacion" type="radio" name="category" value="alimentacion" onChange={handleCategoryChange} checked={selectedCategory === "alimentacion"}>
                    </input>
                    <label htmlFor="alimentacion">Alimentación
                    </label>
                </li>
                <li>
                    <input id="pasajes" type="radio" name="category" value="pasajes" onChange={handleCategoryChange} checked={selectedCategory === "pasajes"}>
                    </input>
                    <label htmlFor="pasajes">Pasajes
                    </label>
                </li>
                <li>
                    <input id="Compras" type="radio" name="category" value="compras" onChange={handleCategoryChange} checked={selectedCategory === "compras"}>
                    </input>
                    <label htmlFor="Compras">Compras
                    </label>
                </li>
            </ul>
        </div>
    );

    const expensesList = expenses.map((expense) => <li key={expense.id}><div onClick={() => handleExpenseDetail(expense.id)}><span>{expense.currency == "soles" ? "S/." : "$"}</span>{expense.amount}<p>{expense.category == "sin categoria" ? "" : expense.category}</p></div><button onClick={() => handleDeleteExpense(expense.id)}>X</button></li>);

    function handleSubmitExpense(event) {
        event.preventDefault();
        setNumberId(numberId + 1);
        const expenseData = {
            id: numberId,
            currency: refCurrency.current.value,
            category: "sin categoria",
            amount: parseFloat(refAmount.current.value),
        }
        setExpenses([...expenses, expenseData]);
        refAmount.current.value = "";
    }

    function handleDeleteExpense(id) {
        setExpenses(expenses.filter(expense => expense.id !== id));
    }

    function handleExpenseDetail(id) {
        setSelectedId(id);
        setIsDetailShown(true);
        setSelectedCategory((expenses.find(expense => expense.id == id)).category);
    }

    function handleCloseDetail() {
        setIsDetailShown(false);
        setExpenses(expenses.map(expense => {
            if (expense.id === selectedId) {
                return {
                    ...expense,
                    ["category"]: selectedCategory
                };
            }
            return expense;
        }))
    }

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div id="expense-register">
            <form action="" onSubmit={handleSubmitExpense}>
                <input ref={refAmount} id="expense" name="expense" step="0.0001" type="number" required/>
                <select ref={refCurrency} name="currency" defaultValue="soles">
                    <option value="soles">S/.</option>
                    <option value="dolares">$</option>
                </select>
                <input type="submit"></input>
            </form>
            <ul id="expense-list">
                {expensesList}
            </ul>
            {isDetailShown ? expenseDetail : ""}
        </div>
    )
}

export default ExpensesRegister;