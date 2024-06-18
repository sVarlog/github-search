import React from "react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/mainSlice";
import clsx from "clsx";
import { Theme } from "../../utils/enums";

interface HeaderProps {
    theme: Theme;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
    const dispatch = useDispatch<AppDispatch>();

    const changeTheme = () => {
        window.localStorage.setItem(
            "theme",
            theme === Theme.light ? Theme.dark : Theme.light
        );
        dispatch(toggleTheme());
    };

    return (
        <header
            className={clsx(
                `w-full h-[70px] flex justify-center items-center`,
                theme === Theme.light
                    ? "bg-light-headerColor"
                    : "bg-dark-headerColor"
            )}
        >
            <div className="container flex justify-between items-center">
                <Logo />

                <h1
                    className={clsx(
                        "text-[14px] sm:text-[20px] md:text-[30px] font-bold",
                        theme === Theme.light
                            ? "text-light-headerFontColor"
                            : "text-dark-headerFontColor"
                    )}
                >
                    <Link to="/">GitHub Search Tool</Link>
                </h1>

                <button
                    className={clsx(
                        "p-[5px] rounded-[5px] hover:brightness-11",
                        theme === Theme.light
                            ? "text-light-headerFontColor bg-light-headerSwitcherColor"
                            : "text-dark-headerFontColor bg-dark-headerSwitcherColor"
                    )}
                    onClick={changeTheme}
                >
                    {theme === Theme.light ? (
                        <img
                            src="/assets/icons/darkTheme.svg"
                            alt="dark mode"
                        />
                    ) : (
                        <img
                            src="/assets/icons/lightTheme.svg"
                            alt="light mode"
                        />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
