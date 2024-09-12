"use client";

import { logout } from "@/helpers/api/logout/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const Navbar = () => {
    const router = useRouter();

    const onLogoutClick = async () => {
        const didLogoutSuccessfully = await logout();
        if (didLogoutSuccessfully) {
            router.push("/");
        }
    };

    return (
        <div className="navbar p-3 w-screen">
            <Image
                alt="deepcuts logo"
                className="animate-twSpin animate-infinite animate-duration-[1760ms]"
                height="50"
                src="/icon.png"
                title="Spinning deepcuts logo"
                width="50"
            />
            <div className="flex-1 ml-2">
                <a className="btn btn-ghost text-xl" href="/">
                    {"deepcuts."}
                </a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between" href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <button onClick={onLogoutClick} type="button">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
