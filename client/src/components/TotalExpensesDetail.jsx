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
        console.log("cambio");
    }, [expenses]);

    const categoriesDetail = (
        categories.map((category, i) => <li key={i}><p>{category.name} :</p><p>{category.amount}</p></li>)
    );

    return (
        <div id="expenses-detail-wrapper">
            <header>
                <p>Gastos Totales Detalle:</p>
                <ul>
                    {categoriesDetail}
                </ul>
            </header>
        </div>
    )
}

export default TotalExpensesDetail;