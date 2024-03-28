import { Datepicker } from "flowbite-react";

function Calendar() {
    return (
        <div className="col-span-2 text-center">
            <header>
                <p>Calendario</p>
            </header>
            <Datepicker inline />
        </div>
    )
}

export default Calendar;