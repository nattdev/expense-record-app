import React from "react";
import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge } from "flowbite-react";

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

    const expensesList = expenses.map(
        (expense) => <li key={expense.id} className="flex">
            <div onClick={() => handleExpenseDetail(expense.id)} className="flex justify-around">
                <span>- {expense.currency == "soles" ? "S/." : "$"}</span>{expense.amount}
                <Badge color={expense.category == "alimentacion" ? "warning" : expense.category == "pasajes" ? "success" : expense.category == "compras" ? "indigo" : "dark"} className="mx-3 text-xs">
                    {expense.category == "sin categoria" ? "sin categoría" : expense.category}
                </Badge>
            </div>
            <button onClick={() => handleDeleteExpense(expense.id)} className="ml-auto">❌</button>
        </li>
    );

    function handleSubmitExpense(event) {
        event.preventDefault();
        if (refAmount.current.value > 0) {
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
        <div id="expense-register" className="row-span-3 bg-[#04394E] text-slate-200 p-6 rounded-3xl">
            <form action="" onSubmit={handleSubmitExpense} className="flex gap-1">
                <input ref={refAmount} id="expense" name="expense" step="0.0001" type="number" required className="w-9/12 text-slate-600 border-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />

                <select ref={refCurrency} name="currency" defaultValue="soles" className="text-slate-600 border-none">
                    <option value="soles">S/.</option>
                    <option value="dolares">$</option>
                </select>
                <input type="submit" className="bg-slate-50 p-2 m-0 outline-none border-none" value={"✔️"}></input>
            </form>
            <ul id="expense-list" className="mt-3">
                {expensesList}
            </ul>
            {isDetailShown ? expenseDetail : ""}
        </div>
    )
}

export default ExpensesRegister;