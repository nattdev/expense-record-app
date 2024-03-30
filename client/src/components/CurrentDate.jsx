function CurrentDate() {
    function formatDate(dateString) {
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const formattedDate = `${day} de ${months[monthIndex]} ${year}`;
        return formattedDate;
    }

    const currentDate = new Date().toISOString();
    const formattedDate = formatDate(currentDate);

    return (
        <div className="font-light">
            {formattedDate}
        </div>
    );
}

export default CurrentDate;