import React from "react";
import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge } from "flowbite-react";
import { Popover, Button } from "flowbite-react";

function ExpensesRegister() {
    const storedItemsExpenses = JSON.parse(localStorage.getItem('expenses'));

    const [numberId, setNumberId] = useState(9);
    const [isCategoryUpdate, setIsCategoryUpdate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedId, setSelectedId] = useState("");

    const { expenses, setExpenses } = useExpenses();
    const { categories } = useExpenses();

    const refAmount = useRef();
    const refCurrency = useRef();
    const refCount = useRef();

    useEffect(() => {
        if (storedItemsExpenses !== null) {
            setExpenses(storedItemsExpenses);
            const maxId = storedItemsExpenses.reduce((max, expense) => expense.id > max ? expense.id : max, 0);
            setNumberId(maxId + 1);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
        if (isCategoryUpdate) {
            setSelectedCategory((expenses.find(expense => expense.id == selectedId)).category);
            setIsCategoryUpdate(false);
        }
    }, [expenses]);

    const radioButtonsList = (
        categories.map((category) =>
            <li key={category.name}>
                <input id={category.name} type="radio" name="category" value={category.name} onChange={handleCategoryChange} checked={selectedCategory === category.name} className="hidden peer">
                </input>
                <label htmlFor={category.name} className={(category.name == "alimentacion" ? "peer-checked:bg-amber-200" : category.name == "pasajes" ? "peer-checked:bg-red-200" : category.name == "compras" ? "peer-checked:bg-indigo-300" : category.name == "sin categoria" ? "peer-checked:bg-slate-200" : "peer-checked:bg-green-200") + " rounded-md border inline-block px-2 py-1 m-1 capitalize"}>{category.name}
                </label>
            </li>
        )
    );

    const expenseDetail = (
        <div id="expense-detail-wrapper" className="bg-white rounded-2xl p-3 text-black">
            <header className="flex justify-between mb-3 font-medium items-center">
                <p>Categorías:</p>
            </header>
            <div className="flex flex-col">
                <ul className="flex flex-col">
                    {radioButtonsList}
                </ul>
                <Button onClick={handleCloseDetail} className="mt-3">Actualizar</Button>
            </div>
        </div>
    );

    const expenseCountSubmit = (
        <div className="p-3 text-black">
            <header className="flex justify-between mb-3 font-medium">
                <p>Cantidad:</p>
            </header>
            <form action="" onSubmit={handleCountChange} className="flex flex-col justify-center items-left">
                <input ref={refCount} id="expenseCount" name="expenseCount" step="1" type="number" min="1" defaultValue="1" className="w-16 text-slate-600 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none rounded-md" placeholder="Cantidad" />
                <Button type="submit" className="mt-3">Actualizar</Button>
            </form>
        </div>
    )

    const expensesList = expenses.map(
        (expense) => <li key={expense.id} className="flex items-center justify-center">
            <div onClick={() => handleExpenseDetail(expense.id)} className="flex w-full items-center">
                <div className="flex justify-center items-center">
                    <div className="min-w-fit">
                        <span>{expense.currency == "soles" ? "S/." : "$"}</span>{expense.amount}
                    </div>
                    <Popover content={expenseCountSubmit} placement="bottom" trigger="click" className="bg-white border border-slate-200 rounded-xl dark:border-white">
                        <div>
                            <Badge className="ml-1"> x {expense.count}</Badge>
                        </div>
                    </Popover>
                </div>
                <Popover content={expenseDetail} placement="bottom" trigger="click" className="bg-white border border-slate-200 rounded-xl dark:border-white">
                    <div>
                        <Badge color={expense.category == "alimentacion" ? "warning" : expense.category == "pasajes" ? "red" : expense.category == "compras" ? "indigo" : expense.category == "sin categoria" ? "gray" : "success"} className="mx-3 text-base md:text-xl min-w-max my-1">
                            {expense.category == "sin categoria" ? "sin categoría" : expense.category}
                        </Badge>
                    </div>
                </Popover>
            </div>
            <button onClick={() => handleDeleteExpense(expense.id)} className="ml-auto bg-slate-50 m-1 rounded-sm text-xl dark:bg-slate-700 dark:text-white">❌</button>
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
                count: 1,
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
    }

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleCountChange(event) {
        event.preventDefault();
        const refCountValue = refCount.current.value;
        setExpenses(expenses.map(expense => {
            if (expense.id === selectedId) {
                return {
                    ...expense,
                    ["count"]: refCountValue,
                };
            }
            return expense;
        }))
    }

    return (
        <div id="expense-register" className="row-span-3 col-span-2 sm:col-span-1 dark:bg-[#04394E] sm:p-6 p-4 rounded-3xl order-3 sm:order-none bg-white shadow-md">
            <header className="pb-6 font-medium text-2xl">
                <p>Registro de Gastos:</p>
            </header>
            <form action="" onSubmit={handleSubmitExpense} className="flex gap-1">
                <input ref={refAmount} id="expense" name="expense" step="0.01" type="number" required className="w-9/12 text-slate-600 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none rounded-md dark:bg-slate-600 dark:text-white dark:placeholder-white" placeholder="Ingresa el Gasto" />

                <select ref={refCurrency} name="currency" defaultValue="soles" className="text-slate-600 border-none text-sm !p-2 !bg-none rounded-md dark:bg-slate-600 dark:text-white dark:placeholder-white">
                    <option value="soles">S/.</option>
                    {/* <option value="dolares">$</option> */}
                </select>
                <input type="submit" className="bg-slate-200 p-2 m-0 outline-none border-none rounded-md ml-auto dark:bg-slate-600 dark:text-white dark:placeholder-white" value={"✔️"}></input>
            </form>
            <ul id="expense-list" className="mt-3 relative w-full">
                {expensesList}
            </ul>
        </div>
    )
}

export default ExpensesRegister;