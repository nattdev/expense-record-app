import { Progress } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import { useExpenses } from "./ExpensesContext";


function BudgetStatistics() {

    const { expenses } = useExpenses();
    const { totalExpenses, setTotalExpenses } = useExpenses();

    const [currentProgress, setCurrentProgress] = useState();
    const [remainingProgress, setRemainingProgress] = useState();


    const [currentBudget, setCurrentBudget] = useState();

    const [isBudgetValid, setIsValidBudget] = useState(false);

    useEffect(() => {
        const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        setTotalExpenses(totalAmount);

        const expensesPercentage = Math.round((totalExpenses * 100) / currentBudget);
        setCurrentProgress(expensesPercentage);
        setRemainingProgress(Math.round(100 - expensesPercentage));

        if (!isBudgetValid) {
            setCurrentProgress(0);
            setRemainingProgress(0);
        }
    }, [expenses, currentBudget, isBudgetValid]);

    const handleCurrentBadget = (event) => {
        if (event.target.value >= totalExpenses) {
            setIsValidBudget(true);
            setCurrentBudget(event.target.value);
        } else {
            setIsValidBudget(false);
        }

    }

    return (
        <div>
            <header>
                <div>
                    <input onChange={handleCurrentBadget} type="number" min={totalExpenses} step={0.01}></input>
                    <p>Presupuesto del día</p>
                </div>
                <p>{isBudgetValid ? "" : "El presupuesto no puede ser menor que el gasto total."}</p>
            </header>
            <section>
                <div>
                    <Progress progress={currentProgress} />
                    <div>
                        <p>{currentProgress} %</p>
                        <p>Gastado</p>
                    </div>
                    <div>
                        <p>{remainingProgress} %</p>
                        <p>Restante</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BudgetStatistics;