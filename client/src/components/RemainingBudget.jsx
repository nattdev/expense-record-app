import { useEffect, useState } from "react";
import { useExpenses } from "./ExpensesContext";

function RemainingBudget() {
    const {totalExpenses, currentBudget} = useExpenses();
    const [remainingBudget, setremainingBudget] = useState();

    useEffect(() => {
        setremainingBudget((currentBudget - totalExpenses).toFixed(2));
    }, [totalExpenses, currentBudget]);

    return (
        <div id="remaining-budget-wrapper" className="bg-lime-500 py-4 px-4 sm:p-6 rounded-3xl grow">
        <p className="font-bold text-3xl">{remainingBudget}</p><p>SALDO RESTANTE</p>
        </div>
    )
}

export default RemainingBudget;