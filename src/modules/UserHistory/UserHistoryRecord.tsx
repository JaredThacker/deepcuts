import { HistoryRecord } from "@/types/api/HistoryRecord";
import Image from "next/image";

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
        <Image
            className="hover:outline outline-gray-400 rounded-full h-14 w-14 hover:cursor-pointer transition-all hover:animate-twSpin hover:animate-infinite hover:animate-duration-[1760ms]"
            alt=""
            height={150}
            width={150}
            src={historyRecord.image_uri}
            loading="lazy"
        />
    </a>
);
