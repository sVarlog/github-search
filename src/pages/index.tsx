import { useEffect, useState, useRef, useCallback } from "react";
import { GitHubUser } from "../utils/interfaces";
import Search from "../components/search/Search";
import UserListItem from "../components/users/list/item";
import Loader from "../components/UI/Loader";
import { getUsersByQuery } from "../api/users";
import DefaultLayout from "../layouts/default/DefaultLayout";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { updateCurrentPage } from "../store/mainSlice";
import { Theme } from "../utils/enums";
import clsx from "clsx";

interface HomeProps {
    theme: Theme;
}

const Home: React.FC<HomeProps> = ({ theme }) => {
    const [query, setQuery] = useState("");
    const [usersList, setUsersList] = useState<GitHubUser[]>([]);
    const [isPageLoading, setPageLoading] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const isInitialLoad = useRef(true);
    const mainSlice = useSelector((store: RootState) => store.mainSlice);
    const dispatch = useDispatch<AppDispatch>();

    const getUsers = useCallback(
        async ({ searchQuery }: { searchQuery: string }) => {
            if (!searchQuery) return;

            try {
                setPageLoading(true);
                setError("");

                const usersList = await getUsersByQuery({
                    query: searchQuery,
                    resultsPerPage: mainSlice.resultsPerPage,
                    page: 1,
                });

                dispatch(updateCurrentPage(2));

                setUsersList(usersList);

                setPageLoading(false);
            } catch (error: any) {
                setError(error.response?.data?.message || error.message);

                setPageLoading(false);
            }
        },
        [mainSlice.resultsPerPage, dispatch]
    );

    const getUsersByScroll = useCallback(
        async ({ searchQuery }: { searchQuery: string }) => {
            if (!searchQuery || isLoading) return;

            try {
                setLoading(true);
                setError("");

                const usersList = await getUsersByQuery({
                    query: searchQuery,
                    resultsPerPage: mainSlice.resultsPerPage,
                    page: mainSlice.page,
                });

                dispatch(updateCurrentPage(mainSlice.page + 1));

                setUsersList((prevUsers) => [...prevUsers, ...usersList]);

                setLoading(false);
            } catch (error: any) {
                setError(error.response?.data?.message || error.message);

                setLoading(false);
            }
        },
        [dispatch, mainSlice.page, mainSlice.resultsPerPage, isLoading]
    );

    const onSearchChange = (value: string) => {
        setQuery(value);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight
            ) {
                return;
            }

            getUsersByScroll({ searchQuery: query });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [query, getUsersByScroll]);

    useEffect(() => {
        if (isInitialLoad.current) {
            const initialQuery = searchParams.get("q");

            if (initialQuery) {
                setQuery(initialQuery);
                getUsers({ searchQuery: initialQuery });
            } else {
                setPageLoading(false);
            }

            isInitialLoad.current = false;
        }
    }, [searchParams, getUsers]);

    useEffect(() => {
        if (!isInitialLoad.current) {
            const newSearchParams = new URLSearchParams(searchParams);

            if (query) {
                newSearchParams.set("q", query);
            } else {
                newSearchParams.delete("q");
            }

            setSearchParams(newSearchParams);
        }
    }, [query, setSearchParams, searchParams]);

    return (
        <DefaultLayout theme={theme}>
            <Search
                theme={theme}
                query={query}
                onInput={onSearchChange}
                onSearchClick={() => getUsers({ searchQuery: query })}
                className="mb-[15px] w-full"
            />
            {isPageLoading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-600 font-bold">Error: {error}</p>
            ) : usersList.length === 0 ? (
                <p
                    className={clsx(
                        "font-bold",
                        theme === Theme.light
                            ? "text-light-contentFontColor"
                            : "text-dark-contentFontColor"
                    )}
                >
                    {!query ? "Enter github username" : "No results found"}
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px] w-full">
                        {usersList.map((user) => (
                            <UserListItem
                                key={user.id}
                                user={user}
                                theme={theme}
                            />
                        ))}
                    </div>

                    {isLoading && <Loader className="mt-[10px]" />}
                </>
            )}
        </DefaultLayout>
    );
};

export default Home;
