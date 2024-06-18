import { DateFormat } from "./enums";

const getFormattedDate = ({
    stringDate,
    format,
}: {
    stringDate?: string;
    format: DateFormat;
}) => {
    if (!stringDate) return "";
    const date = new Date(stringDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = format
        .replace("DD", day)
        .replace("MM", month)
        .replace("YYYY", year);

    return formattedDate;
};

export { getFormattedDate };
