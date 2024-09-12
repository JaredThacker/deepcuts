import { HistoryRecord } from "@/types/api/HistoryRecord";

type UserHistoryRecordProperties = {
    historyRecord: HistoryRecord;
};

export const UserHistoryRecord = ({
    historyRecord,
}: UserHistoryRecordProperties): JSX.Element => (
    <a
        href={`https://discogs.com/release/${historyRecord.recordid}`}
        rel="noreferrer"
        target="_blank"
    >
        <img
            className="hover:outline rounded-full h-14 w-14 hover:cursor-pointer"
            height={150}
            width={150}
            src={historyRecord.image_uri}
        />
    </a>
);
