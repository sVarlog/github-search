import { useEffect, useState } from "react";
import { geteUserByUsername } from "../api/users";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "../components/icons/backIcon";
import Loader from "../components/UI/Loader";
import ProfileContent from "../HOC/ProfileContent";
import { GitHubUser } from "../utils/interfaces";
import DefaultLayout from "../layouts/default/DefaultLayout";
import { getFormattedDate } from "../utils/getFormattedDate";
import { DateFormat, Theme } from "../utils/enums";
import LinkBtn from "../components/profile/LinkBtn";
import DetailItem from "../components/profile/DetailItem";
import clsx from "clsx";

interface ProfileProps {
    theme: Theme;
}

const Profile: React.FC<ProfileProps> = ({ theme }) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null as GitHubUser | null);
    const [infoFields, setInfoFields] = useState(
        [] as { title: string; value: string | number }[]
    );
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);

            const response = await geteUserByUsername({
                username: searchParams.get("id") || "",
            });
            setLoading(false);
            setUser(response);

            return response;
        };

        getUser();
    }, [searchParams]);

    useEffect(() => {
        if (user) {
            const {
                email,
                public_repos,
                twitter_username,
                company,
                followers,
                following,
            } = user;

            const userFields = [
                {
                    title: "Email:",
                    value: email || "N/A",
                },
                {
                    title: "Public repos:",
                    value: public_repos || "N/A",
                },
                {
                    title: "Twitter username:",
                    value: twitter_username || "N/A",
                },
                {
                    title: "Company:",
                    value: company || "N/A",
                },
                {
                    title: "Followers:",
                    value: followers || "N/A",
                },
                {
                    title: "Followings:",
                    value: following || "N/A",
                },
            ];

            setInfoFields(userFields);
        }
    }, [user]);

    return (
        <DefaultLayout theme={theme}>
            <div className="flex w-full relative items-center">
                <button
                    className={clsx(
                        "flex items-center gap-[10px] absolute",
                        theme === Theme.light
                            ? "text-light-linkColor"
                            : "text-dark-linkColor"
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >
                    <BackIcon
                        className={clsx(
                            theme === Theme.light
                                ? "fill-light-linkColor"
                                : "fill-dark-linkColor"
                        )}
                    />

                    <span className="hidden sm:block">Back to Search</span>
                </button>

                <h2
                    className={clsx(
                        "text-[30px] font-bold mx-auto",
                        theme === Theme.light
                            ? "text-light-contentFontColor"
                            : "text-dark-contentFontColor"
                    )}
                >
                    User Details
                </h2>
            </div>

            {isLoading ? (
                <Loader className="mt-[20px]" />
            ) : (
                <div className="flex flex-col lg:flex-row items-start w-full mt-[15px] gap-[30px]">
                    <ProfileContent
                        className={clsx(
                            "flex w-full lg:w-5/12 items-center text-center animate-fadein",
                            theme === Theme.light
                                ? "text-light-contentFontColor"
                                : "text-dark-contentFontColor"
                        )}
                        theme={theme}
                    >
                        <img
                            src={user?.avatar_url}
                            alt="avatar"
                            className="rounded-full w-[150px] h-[150px]"
                        />

                        <h3
                            className={clsx(
                                "text-[24px] font-bold mt-[15px]",
                                theme === Theme.light
                                    ? "text-light-contentFontColor"
                                    : "text-dark-contentFontColor"
                            )}
                        >
                            {user?.name}
                        </h3>

                        <div className="flex flex-col md:flex-row gap-[10px]">
                            {user?.location && (
                                <h3>
                                    <span className="font-bold">
                                        Location:{" "}
                                    </span>
                                    {user.location}
                                </h3>
                            )}

                            {user?.created_at && (
                                <h3>
                                    <span className="font-bold">Since: </span>

                                    {getFormattedDate({
                                        stringDate: user.created_at,
                                        format: DateFormat["DD.MM.YYYY"],
                                    })}
                                </h3>
                            )}
                        </div>

                        <p className="text-[16px] mt-[5px]">{user?.bio}</p>

                        <div className="flex flex-col sm:flex-row mt-[10px] gap-[10px] w-full justify-center">
                            {user?.html_url && (
                                <LinkBtn
                                    theme={theme}
                                    to={user.html_url}
                                    className="w-full md:w-[50%]"
                                >
                                    Profile Link
                                </LinkBtn>
                            )}

                            {user?.blog && (
                                <LinkBtn
                                    theme={theme}
                                    to={user.blog}
                                    className="w-full md:w-[50%]"
                                >
                                    Blog link
                                </LinkBtn>
                            )}
                        </div>
                    </ProfileContent>

                    <ProfileContent
                        className="flex w-full lg:w-7/12 animate-fadein"
                        theme={theme}
                    >
                        <div className="w-full grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px]">
                            {infoFields.map((field, index) => (
                                <DetailItem
                                    key={index}
                                    theme={theme}
                                    title={field.title}
                                    value={field.value}
                                />
                            ))}
                        </div>

                        <p
                            className={clsx(
                                "text-center mt-[15px]",
                                theme === Theme.light
                                    ? "text-light-contentFontColor"
                                    : "text-dark-contentFontColor"
                            )}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborumLorem ipsum dolor
                            sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in
                        </p>
                    </ProfileContent>
                </div>
            )}
        </DefaultLayout>
    );
};

export default Profile;
