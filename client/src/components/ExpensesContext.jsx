import { createContext, useContext, useState } from "react";

export const ExpensesContext = createContext([]);

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error("useExpenses must be used within a ExpensesContextProvider");
    } else {
        return context;
    }
}

export const ExpensesContextProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [currentBudget, setCurrentBudget] = useState(0);
    const [categories, setCategories] = useState([]);

    const calculateTotalByCategory = (expenses, category) => {
        const filteredExpenses = expenses.filter(expense => expense.category.includes(category));
        const totalAmountByCategory = filteredExpenses.reduce((total, expense) => total + (expense.count * expense.amount), 0);
        return totalAmountByCategory.toFixed(2);
    };

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses, totalExpenses, setTotalExpenses, currentBudget, setCurrentBudget, categories, setCategories, calculateTotalByCategory }}>
            {children}
        </ExpensesContext.Provider>
    )

}
