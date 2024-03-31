import { useExpenses } from "./ExpensesContext";

function TotalExpenses () {

    const {totalExpenses} = useExpenses();
    
    return (
        <div id="total-expenses-wrapper" className="bg-pink-700 py-4 px-4 sm:p-6 rounded-3xl grow">
            <p className="font-bold text-2xl sm:text-3xl">{totalExpenses}</p><p>GASTOS TOTALES</p>
        </div>
    )
}

export default TotalExpenses;