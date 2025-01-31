import BudgetStatistics from "./components/BudgetStatistics"
import Calendar from "./components/Calendar"
import ColorModeSwitch from "./components/ColorModeSwitch"
import CurrentDate from "./components/CurrentDate"
import ToolsBar from "./components/ToolsBar"
import { ExpensesContextProvider } from "./components/ExpensesContext"
import ExpensesRegister from "./components/ExpensesRegister"
import Footer from "./components/Footer"
import RemainingBudget from "./components/RemainingBudget"
import TotalExpenses from "./components/TotalExpenses"
import TotalExpensesDetail from "./components/TotalExpensesDetail"

function App() {
  return (
    <div className="flex w-full flex-col items-center p-3 bg-slate-50 text-lg md:text-xl lg:text-xl dark:text-slate-300 dark:bg-[#0A1732] text-slate-800">
      <ExpensesContextProvider>
        <header className="p-3 text-center dark:text-white relative">
          <div className="flex flex-col sm:flex-row items-center">
            <h1 className="text-3xl font-medium pb-3 mr-3">💸 Expense Record App</h1>
            <ColorModeSwitch />
          </div>
          <CurrentDate />
          <ToolsBar />
        </header>
        <main className="grid grid-cols-[auto_auto] auto-rows-auto gap-3">
          <ExpensesRegister />
          <BudgetStatistics />
          <div className="flex justify-between text-center text-white gap-2 col-span-2 sm:col-span-1 order-1 sm:order-none text-sm sm:text-xl">
            <TotalExpenses />
            <RemainingBudget />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 col-span-2 sm:col-span-1 order-4 sm:order-none">
            <TotalExpensesDetail />
            <Calendar />
          </div>
        </main>
        <Footer />
      </ ExpensesContextProvider>
    </div>
  )
}

export default App
