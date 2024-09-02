"use client";

import React from "react";

export const Home = () => {
    return (
        <div className="grow flex flex-row p-4 gap-4">
            <div className="h-full border grow border-gray-500 rounded">
                {"Random History"}
            </div>
            <div className="h-full border grow border-green-500 rounded">
                {"There"}
            </div>
        </div>
    );
};
