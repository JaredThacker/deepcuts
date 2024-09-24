import React from "react";
import { DiscogsRecord } from "../../types/DiscogsRecord";
import { RecordCover } from "./RecordCover/RecordCover";
import { placeholderImageSrc } from "@/common/constants/placeholderImageSrc";
import { FaHeart } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import { useFavoriteRecord } from "./useFavoriteRecord";
import { useRemoveFavorite } from "./useRemoveFavorite";

type RecordDisplayProperties = {
    record: DiscogsRecord;
};

export const RecordDisplay = (props: RecordDisplayProperties) => {
    const { record } = props;
    const { id, images, title, artists, genres, uri, styles, year, labels } =
        record;

    const queryClient = useQueryClient();
    const [favoriteId, setFavorited] = React.useState<number>();

    const { mutateAsync: favoriteRecord } = useFavoriteRecord({ queryClient });
    const { mutateAsync: unfavoriteRecord } = useRemoveFavorite({
        queryClient,
    });

    const onFavorite = React.useCallback(async () => {
        if (favoriteId) {
            const unfavoriteResult = await unfavoriteRecord({ id: favoriteId });

            if (unfavoriteResult !== null) {
                setFavorited(undefined);
            }
        } else {
            const addedRecord = await favoriteRecord({ recordId: id });

            if (addedRecord !== null) {
                setFavorited(addedRecord.id);
            }
        }
    }, [favoriteId, favoriteRecord, id, unfavoriteRecord]);

    return (
        <div className="card shadow-xl animate-fadeIn" key={record.id}>
            <figure>
                {
                    <a href={uri} target="_blank">
                        <RecordCover
                            image={images.length > 0 ? images[0] : undefined}
                            src={
                                images.length > 0
                                    ? undefined
                                    : placeholderImageSrc
                            }
                        />
                    </a>
                }
            </figure>
            <div className="card-body">
                {year > 0 ? (
                    <div>
                        Release: {title} ({year})
                    </div>
                ) : (
                    <div>Release: {title}</div>
                )}

                {labels.length > 0 && <div>Label: {labels[0].name}</div>}

                {artists.length > 1 ? (
                    <div>
                        Artists:{" "}
                        {artists
                            .map((eachArtist) => eachArtist.name)
                            .join(", ")}
                    </div>
                ) : (
                    <div>Artist: {artists[0].name}</div>
                )}

                {genres.length > 0 && <div>Genre: {genres[0]}</div>}

                {styles?.length > 0 && <div>Style: {styles[0]}</div>}
            </div>
            <div className="card-actions absolute bottom-0 right-0 justify-end p-2">
                <button
                    className={`btn-circle btn-sm btn-secondary ${
                        favoriteId ? "" : "btn-outline"
                    } btn`}
                    onClick={onFavorite}
                    title="Favorite"
                >
                    <FaHeart />
                </button>
            </div>
        </div>
    );
};
