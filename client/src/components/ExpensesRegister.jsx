import React from "react";
import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge } from "flowbite-react";
import { Popover, Button } from "flowbite-react";

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
    const [isCategoryUpdate, setIsCategoryUpdate] = useState(false);
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
        if (isCategoryUpdate) {
            setSelectedCategory((expenses.find(expense => expense.id == selectedId)).category);
            setIsCategoryUpdate(false);
        }
    }, [expenses]);

    const expenseDetail = (
        <div id="expense-detail-wrapper" className="bg-white rounded-2xl p-3 text-black">
            <header className="flex justify-between mb-3 font-medium">
                <p>Categorías:</p>
            </header>
            <div className="flex flex-col">
                <ul className="flex flex-col gap-y-1">
                    <li>
                        <input id="alimentacion" type="radio" name="category" value="alimentacion" onChange={handleCategoryChange} checked={selectedCategory === "alimentacion"} className="hidden peer">
                        </input>
                        <label htmlFor="alimentacion" className="peer-checked:bg-amber-200 rounded-md px-3 border">Alimentación
                        </label>
                    </li>
                    <li>
                        <input id="pasajes" type="radio" name="category" value="pasajes" onChange={handleCategoryChange} checked={selectedCategory === "pasajes"} className="hidden peer">
                        </input>
                        <label htmlFor="pasajes" className="peer-checked:bg-green-200 rounded-md px-3 border">Pasajes
                        </label>
                    </li>
                    <li>
                        <input id="Compras" type="radio" name="category" value="compras" onChange={handleCategoryChange} checked={selectedCategory === "compras"} className="hidden peer">
                        </input>
                        <label htmlFor="Compras" className="peer-checked:bg-indigo-300 rounded-md px-3 border">Compras
                        </label>
                    </li>
                </ul>
                <Button onClick={handleCloseDetail} size="xs" className="mt-3">Actualizar</Button>
            </div>
        </div>
    );

    const expensesList = expenses.map(
        (expense) => <li key={expense.id} className="flex">
            <div onClick={() => handleExpenseDetail(expense.id)} className="flex justify-around">
                <span>- {expense.currency == "soles" ? "S/." : "$"}</span>{expense.amount}
                <Popover content={expenseDetail} placement="bottom" trigger="click">
                    <div>
                        <Badge color={expense.category == "alimentacion" ? "warning" : expense.category == "pasajes" ? "success" : expense.category == "compras" ? "indigo" : "dark"} className="mx-3 text-xs">
                            {expense.category == "sin categoria" ? "sin categoría" : expense.category}
                        </Badge>
                    </div>
                </Popover>
            </div>
            <button onClick={() => handleDeleteExpense(expense.id)} className="ml-auto bg-slate-50 m-1 rounded-sm text-xs">❌</button>
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
        setSelectedCategory((expenses.find(expense => expense.id == id)).category);
    }

    function handleCloseDetail() {
        setExpenses(expenses.map(expense => {
            if (expense.id === selectedId) {
                return {
                    ...expense,
                    ["category"]: selectedCategory
                };
            }
            return expense;
        }))
        setIsCategoryUpdate(true);
        console.log()
    }

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div id="expense-register" className="row-span-3 bg-[#04394E] text-slate-200 p-6 rounded-3xl">
            <form action="" onSubmit={handleSubmitExpense} className="flex gap-1">
                <input ref={refAmount} id="expense" name="expense" step="0.0001" type="number" required className="w-9/12 text-slate-600 border-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />

                <select ref={refCurrency} name="currency" defaultValue="soles" className="text-slate-600 border-none text-sm !p-2 !bg-none">
                    <option value="soles">S/.</option>
                    <option value="dolares">$</option>
                </select>
                <input type="submit" className="bg-slate-50 p-2 m-0 outline-none border-none" value={"✔️"}></input>
            </form>
            <ul id="expense-list" className="mt-3 relative">
                {expensesList}
            </ul>
        </div>
    )
}

export default ExpensesRegister;