import BudgetStatistics from "./components/BudgetStatistics"
import Calendar from "./components/Calendar"
import CurrentDate from "./components/CurrentDate"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import RemainingBudget from "./components/RemainingBudget"
import TotalExpenses from "./components/TotalExpenses"
import TotalExpensesDetail from "./components/TotalExpensesDetail"

function App() {
  return (
    <div className="flex flex-col items-center p-3 bg-slate-50">
      <ExpensesContextProvider>
        <header className="pb-3">
          <CurrentDate />
        </header>
        <main className="grid grid-cols-[auto_auto] auto-rows-auto gap-3">
          <ExpensesRegister />
          <BudgetStatistics />
          <div className="flex justify-between text-center text-white gap-2">
            <TotalExpenses />
            <RemainingBudget />
          </div>
          <TotalExpensesDetail />
          <Calendar />
        </main>
      </ ExpensesContextProvider>
    </div>
  )
}

export default App
