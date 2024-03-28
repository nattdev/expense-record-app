import BudgetStatistics from "./components/BudgetStatistics"
import Calendar from "./components/Calendar"
import CurrentDate from "./components/CurrentDate"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import TotalExpenses from "./components/TotalExpenses"
import TotalExpensesDetail from "./components/TotalExpensesDetail"

function App() {
  return (
    <>
      <ExpensesContextProvider>
        <header>
          <CurrentDate />
        </header>
        <main>
          <ExpensesRegister />
          <BudgetStatistics />
          <TotalExpenses />
          <TotalExpensesDetail />
          <Calendar />
        </main>
      </ ExpensesContextProvider>
    </>
  )
}

export default App
