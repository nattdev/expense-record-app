import { useExpenses } from "./ExpensesContext";

function RemainingBudget() {
    const {totalExpenses, currentBudget} = useExpenses();

    return (
        <div id="remaining-budget-wrapper" className="bg-lime-500 p-6 rounded-3xl">
        <p className="font-bold text-3xl">{(currentBudget - totalExpenses).toFixed(2)}</p><p>SALDO RESTANTE</p>
        </div>
    )
}

export default RemainingBudget;