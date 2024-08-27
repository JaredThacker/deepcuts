"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SignUpModal } from "../Modal/SignUpModal";
import { LoginModal } from "../Modal/LoginModal";

export const Landing = () => {
    const router = useRouter();
    const [showSignUpModal, setShowSignUpModal] =
        React.useState<boolean>(false);

    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);

    return (
        <>
            <div className="hero bg-base-200 min-h-screen animate-fadeIn animate-duration-[3000ms]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Welcome</h1>
                        <p className="py-6 text-lg">
                            {
                                "This website will add functionality I feel was always missing from discogs...... a randomizer of sorts! Looking for the next obscure album or gem to uncover? Or maybe just trying to find that next record to play? Don't even know where to start? Introducing deepcuts."
                            }
                        </p>
                        <div className="flex flex-row justify-center gap-4">
                            <button
                                className="btn btn-primary btn-outline w-1/2"
                                onClick={() => {
                                    setShowLoginModal(true);
                                }}
                            >
                                {"Login"}
                            </button>
                            <button
                                className="btn btn-secondary btn-outline w-1/2"
                                onClick={() => {
                                    setShowSignUpModal(true);
                                }}
                            >
                                {"Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SignUpModal onHide={setShowSignUpModal} show={showSignUpModal} />
            <LoginModal onHide={setShowLoginModal} show={showLoginModal} />
        </>
    );
};
