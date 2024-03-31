import { useEffect } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge } from "flowbite-react";

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
        categories.map((category, i) => <li key={i} className="flex m-1 items-center">
            <Badge color={category.name == "alimentacion" ? "warning" : category.name == "pasajes" ? "success" : category.name == "compras" ? "indigo" : "dark"} className="text-base md:text-xl min-w-max">
                <p className="capitalize rounded-md">{category.name} :</p>
            </Badge>
            <p className="ml-3 font-medium">{category.amount}</p>
        </li>)
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