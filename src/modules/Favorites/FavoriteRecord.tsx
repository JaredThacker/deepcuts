import { Ids } from "@/common/constants/Ids";
import { generateRecordTooltip } from "@/helpers/api/record/generateRecordTooltip";
import { Favorite } from "@/types/api/Favorite";
import Image from "next/image";

type UserFavoriteProperties = {
    readonly customImageClassName?: string;
    readonly displayTooltip?: boolean;
    readonly favoriteRecord: Favorite;
    readonly imageContent?: React.JSX.Element;
    readonly onClick?: () => void;
    readonly onDoubleClick?: () => void;
};

export const FavoriteRecord = ({
    customImageClassName,
    displayTooltip = true,
    favoriteRecord,
    imageContent,
    onClick,
    onDoubleClick,
}: UserFavoriteProperties): JSX.Element => (
    <>
        {displayTooltip ? (
            <div
                className="tooltip tooltip-left"
                data-tip={generateRecordTooltip(favoriteRecord)}
            >
                <Image
                    className={`hover:outline outline-gray-400 rounded-full h-32 w-32 hover:cursor-pointer ${
                        customImageClassName ?? ""
                    }`}
                    alt=""
                    id={Ids.RECORD.recordImage}
                    height={400}
                    width={400}
                    src={favoriteRecord.record?.image_uri ?? "/placeholder.svg"}
                    onClick={onClick}
                    onDoubleClick={() => {
                        window.open(
                            `https://discogs.com/release/${favoriteRecord.recordid}`,
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
                {" "}
                <Image
                    className={`hover:outline outline-gray-400 rounded-full h-32 w-32 hover:cursor-pointer ${
                        customImageClassName ?? ""
                    }`}
                    alt=""
                    id={Ids.RECORD.recordImage}
                    height={400}
                    width={400}
                    src={favoriteRecord.record?.image_uri ?? "/placeholder.svg"}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    loading="lazy"
                />
                {imageContent}
            </>
        )}
    </>
);
