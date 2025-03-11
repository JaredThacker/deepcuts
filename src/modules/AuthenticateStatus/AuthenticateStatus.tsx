import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

type AuthenticateStatusProperties = {
    readonly success?: boolean;
};

// TODO: Make page re-usable
export const AuthenticateStatus = ({
    success,
}: AuthenticateStatusProperties): React.JSX.Element => {
    const message = success
        ? "Authentication Success!"
        : "Failed to authenticate.";

    const icon = success ? (
        <FaCheckCircle color="green" size="50" />
    ) : (
        <FaX color="red" />
    );

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <div className="text-4xl font-bold flex flex-row gap-4 items-center animate-jackInTheBox">
                {icon}
                {message}
                {icon}
            </div>
        </div>
    );
};
