import BudgetStatistics from "./components/BudgetStatistics"
import Calendar from "./components/Calendar"
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
          <Calendar />
      </ ExpensesContextProvider>
    </>
  )
}

export default App
