import { generateHistoryRecordTooltip } from "@/helpers/api/record/generateHistoryRecordTooltip";
import { HistoryRecord } from "@/types/api/HistoryRecord";
import Image from "next/image";

type UserHistoryRecordProperties = {
    historyRecord: HistoryRecord;
};

export const UserHistoryRecord = ({
    historyRecord,
}: UserHistoryRecordProperties): JSX.Element => (
    <div
        className="tooltip tooltip-left"
        data-tip={generateHistoryRecordTooltip(historyRecord)}
    >
        <Image
            className="hover:outline outline-gray-400 rounded-full h-14 w-14 hover:cursor-pointer transition-all hover:animate-twSpin hover:animate-infinite hover:animate-duration-[1760ms]"
            alt=""
            height={150}
            width={150}
            src={historyRecord?.record?.image_uri ?? "/placeholder.svg"}
            onClick={() => {}}
            onDoubleClick={() => {
                window.open(
                    `https://discogs.com/release/${historyRecord.recordid}`,
                    "_blank",
                    "noreferrer",
                );
            }}
            loading="lazy"
        />
    </div>
);
