import { useEffect } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge } from "flowbite-react";

function TotalExpensesDetail() {

    const { expenses } = useExpenses();
    const { categories, setCategories, calculateTotalByCategory } = useExpenses();

    useEffect(() => {
        const categoriesList = expenses.reduce((acc, expense) => {
            const index = acc.findIndex(category => category.name === expense.category);
            if (index !== -1) {
                acc[index].amount += expense.amount;
            } else {
                acc.push({ name: expense.category, amount: expense.amount });
            }
            return acc;
        }, []).map(category => ({ name: category.name, amount: calculateTotalByCategory(expenses, category.name) }));

        setCategories(categoriesList);
    }, [expenses]);

    const categoriesDetail = (
        categories.map((category, i) => <li key={i} className="flex m-1 items-center">
            <Badge color={category.name == "alimentacion" ? "warning" : category.name == "pasajes" ? "red" : category.name == "compras" ? "indigo" : "success"} className="text-base md:text-xl min-w-max">
                <p className="capitalize rounded-md">{category.name} :</p>
            </Badge>
            <p className="ml-3 font-medium">{category.amount}</p>
        </li>)
    );

    return (
        <div id="expenses-detail-wrapper" className="dark:bg-yellow-300 text-slate-700 dark:text-slate-800 bg-white shadow-md min-w-min sm:min-w-[350px] sm:p-6 p-4 rounded-3xl">
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