"use client";

import { DiscogsRecord } from "@/types/DiscogsRecord";
import React from "react";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";

export const Home = () => {
    const [record, setRecord] = React.useState<DiscogsRecord>();

    const getRecord = async () => {
        let responseStatus = 404;
        let parsedRecord: DiscogsRecord | undefined = undefined;
        while (responseStatus === 404) {
            const id = Math.floor(Math.random() * 31105274);
            const response = await fetch(
                "https://api.discogs.com/releases/" +
                    id +
                    "?token=pnVhiBkGbDrHnRDrPMCKfDBXwHhvRdfLBvRgvzKb",
            );
            const jsonResponse = await response.json();
            parsedRecord = jsonResponse as DiscogsRecord;
            responseStatus = response.status;
        }
        setRecord(parsedRecord);
    };

    return (
        <div className="h-full flex flex-col justify-center items-center">
            {record !== undefined && <RecordDisplay record={record} />}
            <button
                className="btn btn-active btn-neutral w-fit focus:animate-headShake"
                onClick={getRecord}
            >
                {"Randomize!"}
            </button>
        </div>
    );
};
