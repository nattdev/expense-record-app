import BudgetStatistics from "./components/BudgetStatistics"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import TotalExpenses from "./components/TotalExpenses"

function App() {
  return (
    <>
      <ExpensesContextProvider>
        <ExpensesRegister />
        <BudgetStatistics />
        <TotalExpenses />
      </ ExpensesContextProvider>
    </>
  )
}

export default App
