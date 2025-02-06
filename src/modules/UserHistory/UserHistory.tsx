import { History } from "@/types/api/History";
import { HistoryRecord } from "@/types/api/HistoryRecord";
import dayjs from "dayjs";
import { UserHistoryRecord } from "./UserHistoryRecord";

type HistoryProperties = {
    history: History & { historyrecord: HistoryRecord[] };
};

export const UserHistory = ({ history }: HistoryProperties): JSX.Element => (
    <div className="flex flex-row items-center justify-between w-full p-4 gap-5 rounded-lg bg-base-200 shadow-lg">
        <span className="text-lg font-bold">{`${dayjs(
            history.created_at,
        ).format("MM-DD-YYYY hh:mm")}`}</span>
        <div
            className="flex flex-row gap-2 flex-wrap"
            style={{ maxWidth: "70%" }}
        >
            {history.historyrecord.map((eachHistoryRecord) => (
                <UserHistoryRecord
                    key={`history_record_${eachHistoryRecord.id}`}
                    historyRecord={eachHistoryRecord}
                />
            ))}
        </div>
    </div>
);
