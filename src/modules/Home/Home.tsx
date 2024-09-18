"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import { UserHistory } from "../UserHistory/UserHistory";
import { HistoryWithRecord } from "@/types/api/dto/HistoryWithRecord";
import { HistoryRecordCount } from "@/types/api/dto/HistoryRecordCount";
import ms from "ms";
import Image from "next/image";

export const Home = () => {
    const router = useRouter();
    const { data: history } = useQuery({
        queryKey: ["historyData"],
        queryFn: async () => {
            const historyData = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/history`,
            );
            const historyJson = await historyData.json();
            return historyJson as HistoryWithRecord[];
        },
    });

    const { data: historyRecordCount } = useQuery({
        queryKey: ["historyRecordCount"],
        queryFn: async () => {
            const historyRecordCount = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/history/record/count`,
            );

            const historyRecordCountJson =
                (await historyRecordCount.json()) as HistoryRecordCount;

            return historyRecordCountJson;
        },
        refetchInterval: ms("1m"),
    });

    if (history === undefined || historyRecordCount === undefined) {
        return <span />;
    }

    const { count } = historyRecordCount;

    return (
        <div className="grow flex flex-row p-4 gap-4 animate-fadeIn">
            <div className="h-full grow rounded flex flex-col justify-start gap-4">
                <div className="flex flex-col items-center gap-2">
                    <span className="flex flex-col items-center font-bold">
                        {"Record of the Week"}
                    </span>

                    <div>
                        <a
                            href="https://www.discogs.com/release/4312273-Atoms-For-Peace-Amok"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Image
                                src="https://i.discogs.com/mcIh1A6HEAVQ0pCwZ1mnLqxREjgwikqQijZafZMZ5uI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzMTIy/NzMtMTM2MTUyOTY1/OS0zMzUzLmpwZWc.jpeg"
                                width={300}
                                height={300}
                                alt="Amok Album Cover"
                                className="hover:outline outline-primary transition-all hover:cursor-pointer"
                            />
                        </a>
                    </div>
                    <span className="flex flex-col items-center mt-1">
                        Atoms For Peace - Amok (2013){" "}
                        <span>Genre: Electronic, Rock</span>
                        <span className="mb-1">
                            Style: IDM, Indie Rock, Glitch, Experimental
                        </span>
                    </span>
                </div>

                <div className="border border-primary border-dotted rounded text-center">
                    <div className="stats shadow">
                        <div className="stat font-semibold">
                            <div className="stat-title">Total Randomizes</div>
                            <div className="stat-value flex flex-col items-center text-primary">
                                {count}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center grow">
                    <button
                        className="btn btn-primary btn-ghost btn-outline btn-block text-2xl hover:outline transition-all duration-500 h-full"
                        onClick={() => {
                            router.push("/random");
                        }}
                    >
                        {"Discover Some New Gems"}
                    </button>
                </div>
            </div>
            <div className="h-full rounded w-2/3">
                <div className="text-center font-bold text-lg">{"History"}</div>
                <div className="font-semibold max-h-[51rem] overflow-y-auto overflow-x-auto">
                    {history.map((eachHistory) => (
                        <UserHistory
                            key={eachHistory.id}
                            history={eachHistory}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
