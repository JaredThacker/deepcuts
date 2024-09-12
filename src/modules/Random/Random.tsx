"use client";

import React from "react";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";

export const Random = () => {
    const [record, setRecord] = React.useState<DiscogsRecord>();

    const getRecord = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/record`,
        );
        const parsedResponse = await response.json();
        const parsedRecord = parsedResponse as DiscogsRecord;
        setRecord(parsedRecord);
    };

    return (
        <div className="h-full flex flex-col justify-center items-center animate-fadeIn animate-duration-[3000ms]">
            {record !== undefined && <RecordDisplay record={record} />}
            <button
                className="btn btn-active btn-neutral w-fit focus:animate-headShake hover:outline"
                onClick={getRecord}
            >
                {"Randomize!"}
            </button>
        </div>
    );
};
