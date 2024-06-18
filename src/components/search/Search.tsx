import clsx from "clsx";
import React from "react";
import { Theme } from "../../utils/enums";

interface SearchProps {
    theme: Theme;
    className?: string;
    query: string;
    onInput: (query: string) => void;
    onSearchClick: () => void;
}

const Search: React.FC<SearchProps> = ({
    theme,
    query,
    className,
    onInput,
    onSearchClick,
}) => {
    return (
        <>
            <div
                className={clsx(
                    "flex justify-between relative h-[42px] rounded-[15px] overflow-hidden border-solid border-[1px]",
                    theme === Theme.light
                        ? "border-light-borderColor bg-light-contentColor"
                        : "border-dark-borderColor bg-dark-containerColor",
                    className
                )}
            >
                <input
                    className={clsx(
                        "bg-transparent text-[16px] w-full rounded-[15px] outline-none px-[10px]",
                        theme === Theme.light
                            ? "text-light-contentFontColor"
                            : "text-dark-contentFontColor"
                    )}
                    placeholder="Enter GitHub username"
                    type="text"
                    value={query}
                    onChange={(e) => onInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onSearchClick();
                        }
                    }}
                />

                <button
                    onClick={onSearchClick}
                    className="p-[5px] rounded-[5px] h-full w-[50px] flex justify-center items-center bg-light-headerSwitcherColor"
                >
                    <img src="/assets/icons/search.svg" alt="search" />
                </button>
            </div>
        </>
    );
};

export default Search;
