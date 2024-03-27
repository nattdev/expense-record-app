import BudgetStatistics from "./components/BudgetStatistics"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"

function App() {
  return (
    <>
      <ExpensesContextProvider>
        <ExpensesRegister />
        <BudgetStatistics />
      </ ExpensesContextProvider>
    </>
  )
}

export default App
