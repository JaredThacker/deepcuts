import { generateFavoriteRecordTooltip } from "@/helpers/api/record/generateFavoriteRecordTooltip";
import { Favorite } from "@/types/api/Favorite";
import Image from "next/image";

type UserFavoriteProperties = {
    favoriteRecord: Favorite;
};

export const FavoriteRecord = ({
    favoriteRecord,
}: UserFavoriteProperties): JSX.Element => (
    <div
        className="tooltip tooltip-left"
        data-tip={generateFavoriteRecordTooltip(favoriteRecord)}
    >
        <Image
            className="hover:outline outline-gray-400 rounded-full h-32 w-32 hover:cursor-pointer transition-all hover:animate-twSpin hover:animate-infinite hover:animate-duration-[1760ms]"
            alt=""
            height={400}
            width={400}
            src={favoriteRecord.record?.image_uri ?? "/placeholder.svg"}
            onClick={() => {}}
            onDoubleClick={() => {
                window.open(
                    `https://discogs.com/release/${favoriteRecord.recordid}`,
                    "_blank",
                    "noreferrer",
                );
            }}
            loading="lazy"
        />
    </div>
);
