import { Datepicker } from "flowbite-react";

function Calendar() {
    return (
        <div className="col-span-2 text-center py-6 sm:p-6 rounded-3xl bg-white">
            <header>
                <p className="text-2xl font-medium">Calendario</p>
            </header>
            <Datepicker inline />
        </div>
    )
}

export default Calendar;