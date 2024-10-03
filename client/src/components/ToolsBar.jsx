import { useEffect } from "react";
import { useExpenses } from "./ExpensesContext";

function ToolsBar() {
    const { setExpenses, setCurrentBudget, setCategories } = useExpenses();

    const initialExpenses = [
        { id: 1, currency: "soles", category: "alimentacion", "amount": 200, "count": 1 },
        { id: 2, currency: "soles", category: "compras", "amount": 20.02, "count": 2 },
        { id: 3, currency: "soles", category: "pasajes", "amount": 4.01, "count": 1 },
        { id: 4, currency: "soles", category: "sin categoria", "amount": 5.20, "count": 3 },
        { id: 5, currency: "soles", category: "sin categoria", "amount": 1002.20, "count": 1 },
        { id: 6, currency: "soles", category: "sin categoria", "amount": 10, "count": 5 },
        { id: 7, currency: "soles", category: "sin categoria", "amount": 200, "count": 1 },
        { id: 8, currency: "soles", category: "sin categoria", "amount": 20.02, "count": 1 }
    ]

    const initialCategories = [
        { id: 1, name: "alimentacion", amount: 0.00 },
        { id: 2, name: "compras", amount: 0.00 },
        { id: 3, name: "pasajes", amount: 0.00 },
        { id: 4, name: "sin categoria", amount: 0.00 }
    ];


    useEffect(() => {
        setCategories(initialCategories);
    }, []);

    function demoHandle() {
        setExpenses(initialExpenses);
        setCurrentBudget(2000);
        setCategories(initialCategories);
    }

    function cleanHandle() {
        setExpenses([]);
        setCurrentBudget(0);
    }

    return (
        <div className="flex flex-col justify-between w-full pb-3 items-center mb-3 p-2 text-base">
            <header className="mb-3">
                <p className="font-medium"></p>
            </header>
            <div className="flex flex-row sm:flex-row items-center gap-y-3">
                <div className="flex items-center">
                    <button className="bg-slate-100 text-black p-1 rounded-md mx-1 border border-slate-300 dark:bg-slate-600 dark:border-slate-500
                    dark:text-white" onClick={demoHandle}>Demo 📝</button>
                </div>
                <div className="flex items-center">
                    <button className="bg-slate-100  text-black p-1 rounded-md mx-1 border border-slate-300 dark:bg-slate-600 dark:border-slate-500
                    dark:text-white" onClick={cleanHandle}>Limpiar ✨</button>
                </div>
            </div>
        </div>
    );
}

export default ToolsBar;