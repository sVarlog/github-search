import React from "react";

interface BackIconProps {
    className: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M8.04754 12.7328L7.35387 13.4266C7.06015 13.7203 6.5852 13.7203 6.29461 13.4266L0.220288 7.35469C-0.0734293 7.06094 -0.0734293 6.58594 0.220288 6.29531L6.29461 0.220312C6.58833 -0.0734375 7.06327 -0.0734375 7.35387 0.220312L8.04754 0.914062C8.34438 1.21094 8.33813 1.69531 8.03504 1.98594L4.26984 5.57344H13.2501C13.6657 5.57344 14 5.90781 14 6.32344V7.32344C14 7.73906 13.6657 8.07344 13.2501 8.07344H4.26984L8.03504 11.6609C8.34126 11.9516 8.34751 12.4359 8.04754 12.7328Z" />
    </svg>
);

export default BackIcon;
