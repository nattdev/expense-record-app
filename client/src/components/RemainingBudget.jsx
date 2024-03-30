import { useExpenses } from "./ExpensesContext";

function RemainingBudget() {
    const {totalExpenses, currentBudget} = useExpenses();

    return (
        <div id="remaining-budget-wrapper">
        <p>{(currentBudget - totalExpenses).toFixed(2)}</p><p>SALDO RESTANTE</p>
        </div>
    )
}

export default RemainingBudget;