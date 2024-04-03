import { Datepicker } from "flowbite-react";

function Calendar() {
    return (
        <div className="shadow-md col-span-2 text-center py-6 sm:p-6 rounded-3xl bg-white dark:bg-[#354250] dark:text-slate-200">
            <header>
                <p className="text-2xl font-medium">Calendario</p>
            </header>
            <Datepicker inline />
        </div>
    )
}

export default Calendar;