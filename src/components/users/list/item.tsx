import clsx from "clsx";
import { GitHubUser } from "../../../utils/interfaces";
import { Theme } from "../../../utils/enums";
import { Link } from "react-router-dom";

interface UserListItemProps {
    user: GitHubUser;
    theme: Theme;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, theme }) => {
    return (
        <Link
            className={clsx(
                "py-[10px] px-[12px] rounded-[15px] flex justify-start items-center gap-[10px] shadow-md border-solid border-[1px] animate-fadein",
                theme === Theme.light
                    ? "bg-light-contentColor border-light-borderColor hover:brightness-90"
                    : "bg-dark-contentColor border-dark-borderColor hover:brightness-125"
            )}
            to={`/user?id=${user.id}`}
        >
            <img
                className="rounded-full w-[50px] h-[50px] bg-gray-400"
                src={user.avatar_url}
                alt={user.login}
            />

            <p
                className={clsx(
                    theme === Theme.light
                        ? "text-light-contentFontColor"
                        : "text-dark-contentFontColor"
                )}
            >
                Username: <span className="font-bold">{user.login}</span>
            </p>
        </Link>
    );
};

export default UserListItem;
