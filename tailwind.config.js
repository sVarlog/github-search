/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                fadein: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            colors: {
                light: {
                    headerColor: "var(--lightHeaderColor)",
                    headerSwitcherColor: "var(--lightHeaderSwitcherColor)",
                    headerFontColor: "var(--lightHeaderFontColor)",
                    containerColor: "var(--lightContainerColor)",
                    contentColor: "var(--lightContentColor)",
                    contentFontColor: "var(--lightContentFontColor)",
                    cardColor: "var(--lightCardColor)",
                    linkBtnColor: "var(--lightLinkBtnColor)",
                    linkBtnFontColor: "var(--lightLinkBtnFontColor)",
                    linkColor: "var(--lightLinkColor)",
                    borderColor: "var(--lightBorderColor)",
                },
                dark: {
                    headerColor: "var(--darkHeaderColor)",
                    headerSwitcherColor: "var(--darkHeaderSwitcherColor)",
                    headerFontColor: "var(--darkHeaderFontColor)",
                    containerColor: "var(--darkContainerColor)",
                    contentColor: "var(--darkContentColor)",
                    contentFontColor: "var(--darkContentFontColor)",
                    cardColor: "var(--darkCardColor)",
                    linkBtnColor: "var(--darkLinkBtnColor)",
                    linkBtnFontColor: "var(--darkLinkBtnFontColor)",
                    linkColor: "var(--darkLinkColor)",
                    borderColor: "var(--darkBorderColor)",
                },
            },
            animation: {
                fadein: "fadein .3s ease-out",
            },
        },
        container: {
            padding: "10px",
        },
    },
    plugins: [],
};
