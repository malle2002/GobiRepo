enum OutputFormat {
    Time = "time",
    Date = "date",
    DateTime = "datetime"
}

export default function dateFormatter(date: Date | string | number, type: string) {
    const parsedDate = date instanceof Date ? date : new Date(date);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const year = parsedDate.getUTCFullYear();
    const month = parsedDate.getUTCMonth() + 1;
    const day = parsedDate.getUTCDate();
    const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getUTCSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const currentYear = now.getFullYear();
    const showYear = year !== currentYear;
    const formattedDate = showYear ? `${month}/${day}/${year}` : `${month}/${day}`;

    switch(type) {
        case OutputFormat.Time: {
            return formattedTime;
        }
        case OutputFormat.Date: {
            return `${month}/${day}/${year}`;
        }
        case OutputFormat.DateTime: {
            if (parsedDate >= today) {
                return `Today at ${formattedTime}`;
            } else if (parsedDate >= yesterday) {
                return `Yesterday at ${formattedTime}`;
            } else {
                return `${formattedDate} at ${formattedTime}`;
            }
        }
    }
}
