import { Ids } from "@/common/constants/Ids";
import { generateRecordTooltip } from "@/helpers/api/record/generateRecordTooltip";
import { HistoryRecord } from "@/types/api/HistoryRecord";
import Image from "next/image";

type UserHistoryRecordProperties = {
    readonly customImageClassName?: string;
    readonly displayTooltip?: boolean;
    readonly imageContent?: React.JSX.Element;
    readonly historyRecord: HistoryRecord;
    readonly onClick?: () => void;
};

export const UserHistoryRecord = ({
    customImageClassName,
    displayTooltip = true,
    historyRecord,
    imageContent,
    onClick,
}: UserHistoryRecordProperties): JSX.Element => (
    <>
        {displayTooltip ? (
            <div
                className="tooltip tooltip-left"
                data-tip={generateRecordTooltip(historyRecord)}
            >
                <Image
                    className={`hover:outline outline-gray-400 rounded-full h-14 w-14 hover:cursor-pointer ${
                        customImageClassName ?? ""
                    }`}
                    alt=""
                    id={Ids.RECORD.recordImage}
                    height={150}
                    width={150}
                    src={historyRecord.record?.image_uri ?? "/placeholder.svg"}
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
                {imageContent}
            </div>
        ) : (
            <>
                <Image
                    className={`hover:outline outline-gray-400 rounded-full h-14 w-14 hover:cursor-pointer ${
                        customImageClassName ?? ""
                    }`}
                    alt=""
                    id={Ids.RECORD.recordImage}
                    height={150}
                    width={150}
                    src={historyRecord.record?.image_uri ?? "/placeholder.svg"}
                    onClick={onClick}
                    onDoubleClick={() => {
                        window.open(
                            `https://discogs.com/release/${historyRecord.recordid}`,
                            "_blank",
                            "noreferrer",
                        );
                    }}
                    loading="lazy"
                />
                {imageContent}
            </>
        )}
    </>
);
