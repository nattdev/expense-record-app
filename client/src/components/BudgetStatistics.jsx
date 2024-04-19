import { Progress } from "flowbite-react";
import { useState, useContext, useEffect, useRef } from "react";
import { useExpenses } from "./ExpensesContext";


function BudgetStatistics() {
    const { expenses } = useExpenses();
    const { totalExpenses, setTotalExpenses } = useExpenses();
    const { currentBudget, setCurrentBudget } = useExpenses();

    const [currentProgress, setCurrentProgress] = useState();
    const [remainingProgress, setRemainingProgress] = useState();
    const [isBudgetValid, setIsValidBudget] = useState(false);
    const budgetInput = useRef();

    const storedItemsBudget = currentBudget ? currentBudget : JSON.parse(localStorage.getItem('budget'));

    useEffect(() => {
        if (storedItemsBudget > 0) {
            setCurrentBudget(storedItemsBudget);
            setIsValidBudget(true);
        }
    }, []);

    useEffect(() => {

        const totalAmount = expenses.length > 0 ? expenses.reduce((total, expense) => total + expense.amount, 0) : 0;
        setTotalExpenses(totalAmount.toFixed(2));

        const expensesPercentage = Math.round((totalAmount * 100) / parseFloat(currentBudget));
        setCurrentProgress(expensesPercentage);
        setRemainingProgress(Math.round(100 - expensesPercentage));

        if (parseFloat(currentBudget) >= totalAmount) {
            setIsValidBudget(true);
        } else {
            setIsValidBudget(false);
            setCurrentProgress(0);
            setRemainingProgress(0);
        }
        if (currentBudget) {
            localStorage.setItem("budget", currentBudget);
        } else {
            setCurrentProgress(0);
            setRemainingProgress(0);
        }

        if (currentBudget == 0) {
            setCurrentProgress(0);
            setRemainingProgress(0);
        }

        budgetInput.current.value = currentBudget;
    }, [expenses, currentBudget, isBudgetValid, remainingProgress]);

    const handleCurrentBadget = (event) => {
        if (parseInt(event.target.value) >= totalExpenses) {
            setIsValidBudget(true);
        } else {
            setIsValidBudget(false);
        }
        setCurrentBudget(event.target.value);
    }

    return (
        <div className="dark:bg-[#A7CC15] sm:p-6 p-4 rounded-3xl col-span-2 sm:col-span-1 order-2 sm:order-none bg-white shadow-md dark:text-slate-700">
            <header>
                <div className="flex items-center gap-1">
                    <p className="font-medium text-2xl grow w-full">Presupuesto del día</p>
                    <p className="w-fit">S/.</p>
                    <input ref={budgetInput} onChange={handleCurrentBadget} type="number" min={totalExpenses} step={0.01} className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none rounded-md border text-center h-fit w-full text-xl sm:text-2xl dark:text-slate-700" defaultValue={storedItemsBudget} placeholder="Ingresa el monto"></input>
                </div>
                <p className="dark:text-slate-50 py-3 text-sm">{isBudgetValid || remainingProgress !== 0 ? "" : "* El presupuesto no puede ser menor que el gasto total."}</p>
            </header>
            <section>
                <div>
                    <Progress progress={currentProgress} color="red" size="xl" className="bg-slate-100 dark:bg-white" />
                    <div className="flex text-center items-center w-full justify-around pt-2 text-xl">
                        <div className="text-rose-700 font-medium text-center">
                            <p>{currentProgress} %</p>
                            <p>Gastado</p>
                        </div>
                        <div className="font-medium">
                            <p>{remainingProgress} %</p>
                            <p>Restante</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BudgetStatistics;