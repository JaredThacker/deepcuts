"use client";

import { Routes } from "@/common/routes/Routes";
import { logout } from "@/helpers/api/logout/logout";
import { oauth } from "@/helpers/api/oauth/oauth";
import { Session } from "@/types/api/Session";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type NavbarServerSideProperties = {
    readonly session?: Session;
};

export const Navbar = ({ session }: NavbarServerSideProperties) => {
    const router = useRouter();

    const onLogoutClick = async () => {
        const didLogoutSuccessfully = await logout();
        if (didLogoutSuccessfully) {
            router.push("/");
        }
    };

    const onAuthClick = async () => {
        const authenticateResponse = await oauth();
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
                <Link
                    className="btn btn-ghost text-xl hover:cursor-pointer hover:outline outline-primary hover:text-primary transition-all"
                    href={Routes.DASHBOARD}
                >
                    {"deepcuts."}
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end text-2xl">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full hover:outline outline-primary transition-all">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <button
                                className={`${
                                    session?.data.oauthToken === undefined
                                        ? ""
                                        : "btn-disabled pointer-events-none text-gray-500 text-opacity-50"
                                }`}
                                disabled={
                                    session?.data.oauthToken !== undefined
                                }
                                onClick={onAuthClick}
                                type="button"
                            >
                                {`Authenticate${
                                    session?.data.oauthToken === undefined
                                        ? ""
                                        : "d"
                                }`}
                            </button>
                        </li>
                        <li>
                            <Link
                                className="justify-between"
                                href={Routes.DASHBOARD}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href={Routes.PROFILE}>Edit Profile</Link>
                        </li>
                        <li>
                            <Link href={Routes.SUPPORT}>Support</Link>
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
