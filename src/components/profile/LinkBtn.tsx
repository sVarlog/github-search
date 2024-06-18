import clsx from "clsx";
import { Theme } from "../../utils/enums";

interface LinkBtnProps {
    theme: Theme;
    to: string;
    className?: string;
    children: React.ReactNode;
}

const LinkBtn: React.FC<LinkBtnProps> = ({
    theme,
    to,
    children,
    className,
}) => {
    return (
        <a
            href={to}
            className={clsx(
                "w-[150px] h-[30px] rounded-[10px]  font-bold flex justify-center items-center shadow-md border-solid border-[1px]",
                theme === Theme.light
                    ? "bg-light-linkBtnColor text-light-linkBtnFontColor border-light-borderColor hover:brightness-90"
                    : "bg-dark-linkBtnColor text-dark-linkBtnFontColor border-dark-borderColor hover:brightness-125",
                className
            )}
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    );
};

export default LinkBtn;
