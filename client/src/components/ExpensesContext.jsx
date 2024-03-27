import { createContext, useContext, useState } from "react";

export const ExpensesContext = createContext([]);

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if(!context) {
        throw new Error("useExpenses must be used within a ExpensesContextProvider");
    } else {
        return context;
    }
}

export const ExpensesContextProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState();

    return (
        <ExpensesContext.Provider value={{expenses, setExpenses, totalExpenses, setTotalExpenses}}>
            {children}
        </ExpensesContext.Provider>
    ) 

}
