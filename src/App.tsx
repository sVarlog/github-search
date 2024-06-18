import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./css/App.css";
import "./css/reset.css";
import "./css/tailwind.css";

import HomePage from "./pages/index";
import ProfilePage from "./pages/Profile";
import { Theme } from "./utils/enums";
import { setTheme } from "./store/mainSlice";

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        return savedTheme;
    }

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return Theme.dark;
    }

    return Theme.light;
};

const AppWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

const App: React.FC = () => {
    const theme = useSelector((store: RootState) => store.mainSlice.theme);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        const savedTheme = getInitialTheme();

        dispatch(setTheme(savedTheme));
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage theme={theme} />} />
                <Route path="/user" element={<ProfilePage theme={theme} />} />
            </Routes>
        </Router>
    );
};

const RootApp: React.FC = () => {
    return (
        <AppWrapper>
            <App />
        </AppWrapper>
    );
};

export default RootApp;
