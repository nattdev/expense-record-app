import BudgetStatistics from "./components/BudgetStatistics"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import TotalExpenses from "./components/TotalExpenses"
import TotalExpensesDetail from "./components/TotalExpensesDetail"

function App() {
  return (
    <>
      <ExpensesContextProvider>
        <ExpensesRegister />
        <BudgetStatistics />
        <TotalExpenses />
        <TotalExpensesDetail />
      </ ExpensesContextProvider>
    </>
  )
}

export default App
