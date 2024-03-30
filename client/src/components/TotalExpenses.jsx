import { useExpenses } from "./ExpensesContext";

function TotalExpenses () {

    const {totalExpenses} = useExpenses();
    
    return (
        <div id="total-expenses-wrapper" className="bg-pink-700 p-6 rounded-3xl">
            <p className="font-bold text-3xl">{totalExpenses}</p><p>GASTOS TOTALES</p>
        </div>
    )
}

export default TotalExpenses;