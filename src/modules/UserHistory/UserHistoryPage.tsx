"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { visitRecord } from "@/helpers/components/FavoriteRecord/visitRecord";
import { UserHistoryRecord } from "./UserHistoryRecord";
import { generateRecordTooltip } from "@/helpers/api/record/generateRecordTooltip";
import { HistoryWithRecord } from "@/types/api/dto/HistoryWithRecord";
import { HistoryRecord } from "@/types/api/HistoryRecord";
import { UserHistory } from "./UserHistory";

export const UserHistoryPage = () => {
    const { data: historyRecordData } = useQuery<HistoryWithRecord[]>({
        queryKey: ["history"],
    });

    const onClick = React.useCallback(
        (_historyRecord: HistoryRecord) => () => {
            visitRecord(_historyRecord.recordid);
        },
        [],
    );

    if (historyRecordData === undefined) {
        return <span />;
    }

    return (
        <div className="flex flex-col items-center gap-4 flex-wrap w-full">
            {historyRecordData.map((eachHistoryRecord) => (
                <div
                    key={eachHistoryRecord.id}
                    className="flex flex-col items-center gap-4 flex-wrap w-full"
                >
                    {eachHistoryRecord.historyrecord.map((eachRecord) => (
                        <div
                            className="w-[85%] flex flex-row gap-2 items-center bg-base-300 rounded py-2 px-6"
                            key={eachRecord.recordid}
                        >
                            <UserHistoryRecord
                                customImageClassName="h-20 w-20"
                                displayTooltip={false}
                                historyRecord={eachRecord}
                                imageContent={
                                    <div className="text-sm p-1 font-bold">
                                        {generateRecordTooltip(eachRecord)}
                                    </div>
                                }
                                onClick={onClick(eachRecord)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
