import { useEffect, useRef, useState } from "react";
import { useExpenses } from "./ExpensesContext";
import { Badge, Popover, Button } from "flowbite-react";

function TotalExpensesDetail() {
    const storedCategoriesExpenses = JSON.parse(localStorage.getItem('categories'));

    const [numberId, setNumberId] = useState(5);

    const { expenses } = useExpenses();
    const { categories, setCategories, calculateTotalByCategory } = useExpenses();

    const refCategory = useRef();

    useEffect(() => {
        if (storedCategoriesExpenses !== null) {
            setCategories(storedCategoriesExpenses);
            const maxId = storedCategoriesExpenses.reduce((max, category) => category.id > max ? category.id : max, 0);
            setNumberId(maxId + 1);
        }
    }, []);

    useEffect(() => {
        const updateCategoryAmounts = () => {
            const updatedCategories = categories.map(category => ({
                ...category,
                amount: calculateTotalByCategory(expenses, category.name)
            }));
            if (updatedCategories.length > 0) {
                setCategories(updatedCategories);
            }
        };

        updateCategoryAmounts();
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const categoriesDetail = (
        categories.map((category, i) => <li key={i} className="flex m-1 items-center">
            <div>
                <Badge color={category.name == "alimentacion" ? "warning" : category.name == "pasajes" ? "red" : category.name == "compras" ? "indigo" : category.name == "sin categoria" ? "gray" : "success"} className="text-base md:text-xl min-w-max">
                    <p className="capitalize rounded-md">{category.name} :</p>
                </Badge>
                <p className="ml-3 font-medium">{category.amount}</p>
            </div>
            <button disabled={category.amount == 0 ? false : true} onClick={() => handleDeleteCategory(category.id)} className="ml-auto bg-slate-50 m-1 rounded-sm text-xl disabled:opacity-10">❌</button>
        </li>)
    );

    const expenseCategorySubmit = (
        <div className="p-3 text-black">
            <header className="flex justify-between mb-3 font-medium">
                <p>Nueva Categoría:</p>
            </header>
            <form action="" onSubmit={handleCategoryCreate} className="flex flex-col justify-center items-left">
                <input id="expenseCategory" name="expenseCategory" step="1" type="text" defaultValue="" ref={refCategory} className=" text-slate-600 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none rounded-md" placeholder="Categoría" />
                <Button type="submit" className="mt-3">Agregar</Button>
            </form>
        </div>
    );

    function handleCategoryCreate(event) {
        event.preventDefault();
        const refCategoryValue = refCategory.current.value;
        const categoryExists = categories.some(category => category.name === refCategoryValue);

        if (!categoryExists) {
            setNumberId(numberId + 1);
            const newCategory = {
                id: numberId,
                name: refCategoryValue,
                amount: 0.00
            }
            setCategories([...categories, newCategory]);
        }
    }

    function handleDeleteCategory(id) {
        if (categories.find(category => category.id === id).amount == 0) {
            setCategories(categories.filter(categories => categories.id !== id));
        }
    }

    return (
        <div id="expenses-detail-wrapper" className="dark:bg-yellow-300 text-slate-700 dark:text-slate-800 bg-white shadow-md min-w-min sm:min-w-[350px] sm:p-6 p-4 rounded-3xl">
            <header className="text-2xl font-medium pb-3">
                <p>Detalle de Gastos:</p>
            </header>
            <div className="flex">
                <div>
                    <p>Nueva Categoría</p>
                    <Popover content={expenseCategorySubmit} placement="right" trigger="click" className="bg-white border border-slate-200 rounded-xl dark:border-white">
                        <button>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </Popover>
                </div>
            </div>
            <ul>
                {categoriesDetail}
            </ul>
        </div>
    )
}

export default TotalExpensesDetail;