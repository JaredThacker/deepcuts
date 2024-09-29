import { placeholderImageSrc } from "@/common/constants/placeholderImageSrc";
import { Favorite } from "@/types/api/Favorite";
import Image from "next/image";

type UserFavoriteProperties = {
    favoriteRecord: Favorite;
};

export const FavoriteRecord = ({
    favoriteRecord,
}: UserFavoriteProperties): JSX.Element => (
    <a
        href={`https://discogs.com/release/${favoriteRecord.recordid}`}
        rel="noreferrer"
        target="_blank"
    >
        <Image
            className="hover:outline outline-gray-400 rounded-full h-14 w-14 hover:cursor-pointer transition-all hover:animate-twSpin hover:animate-infinite hover:animate-duration-[1760ms]"
            alt=""
            height={150}
            width={150}
            src={favoriteRecord.image_uri ?? placeholderImageSrc}
            loading="lazy"
        />
    </a>
);
