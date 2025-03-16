"use client";

import React from "react";
import { SignUpModal } from "../Modal/SignUpModal";
import { LoginModal } from "../Modal/LoginModal";
import { InfoModal } from "../Modal/InfoModal";
import { ForgotPasswordModal } from "../Modal/ForgotPasswordModal";

export const Landing = () => {
    const [showSignUpModal, setShowSignUpModal] =
        React.useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
    const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] =
        React.useState<boolean>(false);

    const emoticon = "ツ ";

    return (
        <>
            <div className="hero bg-base-200 min-h-screen animate-fadeIn animate-duration-[3000ms] bg-landing_bg flex flex-col justify-center">
                <div className="hero-content text-center rounded-3xl w-1/3">
                    <div className="max-w-md">
                        <button
                            className="btn mb-7 w-2/3 hover:btn-outline hover:outline-primary"
                            onClick={() => {
                                setShowInfoModal(true);
                            }}
                        >
                            <span className="text-2xl pointer-events-none">
                                {"deepcuts."}
                            </span>
                        </button>
                        <div className="flex flex-row justify-center gap-4 w-96">
                            <button
                                className="btn btn-primary w-1/2"
                                onClick={() => {
                                    setShowLoginModal(true);
                                }}
                            >
                                {"Log In"}
                            </button>
                            <button
                                className="btn btn-secondary w-1/2"
                                onClick={() => {
                                    setShowSignUpModal(true);
                                }}
                            >
                                {"Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-52">
                    <a
                        href="https://www.buymeacoffee.com/deepcutsofficial"
                        target="_blank"
                    >
                        <img
                            className="w-[300px] h-[50px]"
                            src={`https://img.buymeacoffee.com/button-api/?text=Support me directly here ${emoticon}&emoji=&slug=deepcutsofficial&button_colour=6360fa&font_colour=ffffff&font_family=Comic&outline_colour=ffffff&coffee_colour=724e2c`}
                        />
                    </a>
                </div>
            </div>

            <InfoModal onHide={setShowInfoModal} show={showInfoModal} />
            <SignUpModal onHide={setShowSignUpModal} show={showSignUpModal} />
            <LoginModal
                onShowForgotPassword={setShowForgotPasswordModal}
                onHide={setShowLoginModal}
                show={showLoginModal}
            />
            <ForgotPasswordModal
                onHide={setShowForgotPasswordModal}
                show={showForgotPasswordModal}
            />
        </>
    );
};
