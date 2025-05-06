"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserHistory } from "../UserHistory/UserHistory";
import { HistoryWithRecord } from "@/types/api/dto/HistoryWithRecord";
import { HistoryRecordCount } from "@/types/api/dto/HistoryRecordCount";
import ms from "ms";
import Image from "next/image";
import { Favorites } from "../Favorites/Favorites";
import { Routes } from "@/common/routes/Routes";

enum Tabs {
    History,
    Favorites,
}

export const Home = () => {
    const [tabActive, setTabActive] = useState<Tabs>(Tabs.History);
    const router = useRouter();
    const { data: history } = useQuery<HistoryWithRecord[]>({
        queryKey: ["history"],
    });

    // TODO: Fix count not updating correctly
    const { data: historyRecordCount } = useQuery<HistoryRecordCount>({
        queryKey: ["history/record/count"],
        refetchInterval: ms("1m"),
    });

    const tabOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const { target } = event;
        if (target !== null) {
            const castedTarget = target as HTMLAnchorElement;
            const { tabvalue: tabEnumValue } = castedTarget.dataset;
            if (tabEnumValue !== undefined) {
                setTabActive(Number.parseInt(tabEnumValue));
            }
        }
    };

    if (history === undefined || historyRecordCount === undefined) {
        return <span />;
    }

    const { count } = historyRecordCount;

    return (
        <div className="grow flex flex-row p-4 gap-4 animate-fadeIn lg:overflow-hidden">
            <div className="h-full grow rounded flex flex-col justify-start gap-4 animate-fadeInLeft animate-duration-[2000ms]">
                <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg shadow-xl md:flex">
                    <span className="flex flex-col items-center font-bold underline">
                        {"Record of the Month"}
                    </span>
                    <div>
                        <a
                            href="https://www.discogs.com/master/121949-Lonnie-Liston-Smith-And-The-Cosmic-Echoes-Reflections-Of-A-Golden-Dream"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Image
                                src="https://i.discogs.com/i3fkZ1Ok_Bgwd88wDt9T3TOkvmHb_UaqOFrjc20rfwE/rs:fit/g:sm/q:90/h:599/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTkxMDQ1/MS0xMTcyMDQyNDU3/LmpwZWc.jpeg"
                                width={300}
                                height={300}
                                alt="Reflections Of A Golden Dream Album Cover"
                                className="hover:outline outline-primary transition-all hover:cursor-pointer"
                            />
                        </a>
                    </div>
                    <div className="flex flex-col items-center mt-1">
                        <span className="font-extrabold">
                            {"Lonnie Liston Smith & The Cosmic Echoes"}
                        </span>
                        <span className="italic">
                            {"\n Reflections Of A Golden Dream (1976)"}
                        </span>
                        <div>
                            <span className="font-medium">Genre</span>: Jazz,
                            Funk/Soul
                        </div>
                        <div className="mb-1">
                            <span className="font-medium">Style</span>: Fusion,
                            Jazz-Funk
                        </div>
                    </div>
                </div>
                <div className="bg-base-300 rounded text-center shadow-lg">
                    <div className="stats shadow bg-inherit">
                        <div className="stat font-semibold">
                            <div className="stat-title">
                                Total Randomizes Sitewide
                            </div>
                            <div className="stat-value flex flex-col items-center text-primary">
                                {count}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center grow bg-base-300 shadow-xl">
                    <button
                        className="btn btn-primary btn-ghost btn-outline btn-block text-2xl hover:outline transition-all duration-500 h-full"
                        onClick={() => {
                            router.push(Routes.RANDOM);
                        }}
                    >
                        {"Discover"}
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex h-full rounded w-2/3 flex-col animate-fadeInRight animate-duration-[2000ms]">
                <div
                    className="flex flex-row tabs tabs-box w-full"
                    role="tablist"
                >
                    <a
                        className={`tab grow hover:cursor-pointer hover:text-blue-200 hover:font-bold transition-all hover:tracking-wider duration-500 ${
                            tabActive === Tabs.History
                                ? "tab-active font-bold"
                                : ""
                        }`}
                        data-tabvalue={Tabs.History}
                        role="tab"
                        onClick={tabOnClick}
                    >
                        {"History"}
                    </a>
                    <a
                        className={`tab grow hover:cursor-pointer hover:text-blue-200 hover:font-bold transition-all hover:tracking-wider duration-500 ${
                            tabActive === Tabs.Favorites
                                ? "tab-active font-bold"
                                : ""
                        }`}
                        data-tabvalue={Tabs.Favorites}
                        role="tab"
                        onClick={tabOnClick}
                    >
                        {"Favorites"}
                    </a>
                </div>
                <div className="font-semibold max-h-[51rem] overflow-y-auto overflow-x-auto p-4">
                    {tabActive === Tabs.History &&
                        history.map((eachHistory, eachHistoryIndex) => (
                            <UserHistory
                                key={eachHistory.id}
                                history={eachHistory}
                            />
                        ))}
                    {tabActive === Tabs.Favorites && <Favorites />}
                </div>
            </div>
        </div>
    );
};
