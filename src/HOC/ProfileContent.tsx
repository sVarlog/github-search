import clsx from "clsx";
import { Theme } from "../utils/enums";

interface ProfileContentProps {
    children: React.ReactNode;
    className?: string;
    theme: Theme;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
    children,
    className,
    theme,
}) => {
    return (
        <section
            className={clsx(
                "rounded-[15px] shadow-sm p-[30px] flex flex-col",
                theme === Theme.light
                    ? "bg-light-cardColor"
                    : "bg-dark-cardColor",
                className
            )}
        >
            {children}
        </section>
    );
};

export default ProfileContent;
