import { useEffect } from "react";
import { useExpenses } from "./ExpensesContext";

function TotalExpensesDetail() {

    const { expenses } = useExpenses();

    const calculateTotalByCategory = (expenses, category) => {
        const filteredExpenses = expenses.filter(expense => expense.category.includes(category));
        const totalAmountByCategory = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
        return totalAmountByCategory;
    };

    const categories = [
        { name: "alimentacion", amount: calculateTotalByCategory(expenses, "alimentacion") },
        { name: "compras", amount: calculateTotalByCategory(expenses, "compras") },
        { name: "pasajes", amount: calculateTotalByCategory(expenses, "pasajes") },
        { name: "sin categoria", amount: calculateTotalByCategory(expenses, "sin categoria") }
    ];

    useEffect(() => {
    }, [expenses]);

    const categoriesDetail = (
        categories.map((category, i) => <li key={i} className="flex m-1"><p className="capitalize mr-3 bg-white p-1 rounded-md">{category.name} :</p><p className="font-bold">{category.amount}</p></li>)
    );

    return (
        <div id="expenses-detail-wrapper" className="bg-yellow-300 min-w-min sm:min-w-[350px] sm:p-6 p-4 rounded-3xl">
            <header className="text-2xl font-medium pb-3">
                <p>Detalle de Gastos:</p>
            </header>
            <ul>
                {categoriesDetail}
            </ul>
        </div>
    )
}

export default TotalExpensesDetail;