"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const Landing = () => {
    const router = useRouter();

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome</h1>
                    <p className="py-6 text-lg">
                        This website will add functionality I feel was always
                        missing from discogs......a randomizer of sorts! Looking
                        for the next obscure album or gem to uncover? Or maybe
                        just trying to find that next record to play? Don't even
                        know where to start? Introducing deepcuts.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push("/dashboard")}
                    >
                        Let's Go!
                    </button>
                </div>
            </div>
        </div>
    );
};
