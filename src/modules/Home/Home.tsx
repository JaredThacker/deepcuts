"use client";

import React from "react";

export const Home = () => {
    return (
        <div className="grow flex flex-row p-4 gap-4 animate-fadeIn">
            <div className="h-full border grow border-gray-500 rounded">
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-blue-200 rounded">
                    Record of the Day
                </div>
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-gray-200 rounded">
                    Favorites
                </div>
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-gray-300 rounded">
                    Number of randomizes
                </div>
            </div>
            <div className="h-full border grow border-green-500 rounded">
                <div className="h-fit w-11/12 m-8 flex flex-col items-center grow">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => {}}
                    >
                        {"find some new gems!"}
                    </button>
                </div>
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-green-400 rounded">
                    History Elements
                </div>
            </div>
        </div>
    );
};
