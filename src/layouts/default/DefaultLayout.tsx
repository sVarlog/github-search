import clsx from "clsx";
import Header from "../../components/header/Header";
import { Theme } from "../../utils/enums";

interface DefaultLayoutProps {
    children: React.ReactNode;
    theme: Theme;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, theme }) => {
    return (
        <main>
            <Header theme={theme} />

            <section
                className={clsx(
                    "w-full h-full py-[20px] box-border min-h-[calc(100vh_-_70px)] flex justify-center",
                    theme === Theme.light
                        ? "bg-light-containerColor"
                        : "bg-dark-containerColor"
                )}
            >
                <div className="container flex flex-col items-center">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default DefaultLayout;
