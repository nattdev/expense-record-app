import BudgetStatistics from "./components/BudgetStatistics"
import Calendar from "./components/Calendar"
import CurrentDate from "./components/CurrentDate"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import TotalExpenses from "./components/TotalExpenses"
import TotalExpensesDetail from "./components/TotalExpensesDetail"

function App() {
  return (
    <div className="flex flex-col items-center p-3 bg-slate-50">
      <ExpensesContextProvider>
        <header className="pb-3">
          <CurrentDate />
        </header>
        <main className="grid grid-cols-[40%_60%] auto-rows-auto gap-3">
          <ExpensesRegister />
          <BudgetStatistics />
          <TotalExpenses />
          <TotalExpensesDetail />
          <Calendar />
        </main>
      </ ExpensesContextProvider>
    </div>
  )
}

export default App
