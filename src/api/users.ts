import axios from "axios";
import { GitHubUser } from "../utils/interfaces";

const getUsersByQuery = async ({
    query,
    resultsPerPage,
    page,
}: {
    query: string;
    resultsPerPage: number;
    page: number;
}): Promise<GitHubUser[]> => {
    try {
        const response = await axios.get(
            "https://api.github.com/search/users",
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json",
                },
                params: { q: query, page, per_page: resultsPerPage },
            }
        );

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.data.items;
    } catch (error: any) {
        console.error("Error: ", error.response.data?.message || error.message);

        return [];
    }
};

const geteUserByUsername = async ({
    username,
}: {
    username: string;
}): Promise<GitHubUser> => {
    try {
        const response = await axios.get(
            `https://api.github.com/user/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        console.error("Error: ", error.response.data?.message || error.message);

        return {} as GitHubUser;
    }
};

export { getUsersByQuery, geteUserByUsername };
