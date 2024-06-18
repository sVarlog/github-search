import clsx from "clsx";
import { Theme } from "../../utils/enums";

interface DetailItemProps {
    theme: Theme;
    title: string;
    value: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ theme, title, value }) => {
    return (
        <div
            className={clsx(
                "flex flex-col justify-center items-center gap-[10px] py-[13px] rounded-[10px] shadow-md border-solid border-[1px]  px-[10px] text-center",
                theme === Theme.light
                    ? "text-light-contentFontColor border-light-borderColor bg-light-contentColor hover:brightness-90"
                    : "text-dark-contentFontColor border-dark-borderColor bg-dark-contentColor hover:brightness-125"
            )}
        >
            <span className="font-bold">{title}</span>
            <span>{value}</span>
        </div>
    );
};

export default DetailItem;
