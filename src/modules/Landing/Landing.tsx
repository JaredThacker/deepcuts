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
                        This website will add functionality i feel was always
                        missing from discogs......a randomizer of sorts! Looking
                        for the next obscure album or private press? Or maybe
                        just trying to find that next record to play? Don't know
                        where to start? Don't worry because deepcuts has got you
                        now!
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
