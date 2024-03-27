import { useExpenses } from "./ExpensesContext";

function TotalExpenses () {

    const {totalExpenses} = useExpenses();
    
    return (
        <div id="total-expenses-wrapper">
            <p>{totalExpenses}</p><p>GASTOS TOTALES</p>
        </div>
    )
}

export default TotalExpenses;