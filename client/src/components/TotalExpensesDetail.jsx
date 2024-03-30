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
        categories.map((category, i) => <li key={i}><p className="capitalize">{category.name} :</p><p className="font-bold">{category.amount}</p></li>)
    );

    return (
        <div id="expenses-detail-wrapper" className="bg-yellow-300 p-6 rounded-3xl">
            <header className="text-2xl font-medium">
                <p>Gastos Totales Detalle:</p>
            </header>
            <ul>
                {categoriesDetail}
            </ul>
        </div>
    )
}

export default TotalExpensesDetail;