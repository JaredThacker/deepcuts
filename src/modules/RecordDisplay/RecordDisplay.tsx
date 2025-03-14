import React from "react";
import { DiscogsRecord } from "../../types/DiscogsRecord";
import { RecordCover } from "./RecordCover/RecordCover";
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

    /***
     * Calls useFavoriteRecord with the `queryClient`, the usage is specified in the hook documentation, but importantly I am DESTRUCTURING the `mutateAsync` function,
     * and since I know it returns a value with a key that is exactly called `mutateAsync`, I can destructure it, and ALSO RENAME THE DESTRUCTURED VALUE to `favoriteRecord`, so now
     * `favoriteRecord` = `mutateAsync`
     */
    const { mutateAsync: favoriteRecord } = useFavoriteRecord({ queryClient });
    const { mutateAsync: unfavoriteRecord } = useRemoveFavorite({
        queryClient,
    });

    /**
     * Uses `useCallback`, which takes 2 parameters.
     *
     * 1) The callback function (basically an anonymous function, or lambda)
     * 2) Dependency array, which ties into the details of `useCallback`.
     *
     * Details:
     * `useCallback` is a way to "memoize" or "cache" a function, and only change (re-render) that function if ANY DEPENDENCY VALUE CHANGES
     * So the term "re-render" the function, refers to `onFavorite` EQUALING that cached function, so you can call it, as if it was that callback.
     *
     * The reason we do this, is because React decides to re-render based on "shallow equality", aka it does not actually check the values of an object, it only checks
     * the memory address it is stored at. So therefore, when a component re-renders, it creates a new function, therefore, even if they are EXACTLY the same function, it treats
     * it as if the functions are different. This avoids that, saying that DO NOT recreate the function IF NOTHING HAS CHANGED.
     */
    const onFavorite = React.useCallback(async () => {
        if (favoriteId) {
            const unfavoriteResult = await unfavoriteRecord({ id: favoriteId });

            if (unfavoriteResult !== null) {
                setFavorited(undefined);
            }
        } else {
            const addedRecord = await favoriteRecord({
                recordId: id,
            });

            if (addedRecord !== null) {
                setFavorited(addedRecord.id);
            }
        }
    }, [favoriteId, favoriteRecord, id, unfavoriteRecord]);

    /**
     * RUNS ON INITIAL RENDER
     */
    React.useEffect(() => {
        setFavorited(undefined);
    }, [record]);

    return (
        <div
            className="card shadow-xl animate-fadeIn animate-duration-[2000ms] w-[400px] h-[550px]"
            key={record.id}
        >
            <figure>
                {
                    <a href={uri} target="_blank">
                        <RecordCover
                            image={images?.length > 0 ? images[0] : undefined}
                            src={
                                images?.length > 0
                                    ? undefined
                                    : "/placeholder.svg"
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

                {labels?.length > 0 && <div>Label: {labels[0].name}</div>}

                {artists?.length > 1 ? (
                    <div>
                        Artists:{" "}
                        {artists
                            .map((eachArtist) => eachArtist.name)
                            .join(", ")}
                    </div>
                ) : (
                    <div>Artist: {artists[0].name}</div>
                )}

                {genres?.length > 1 ? (
                    <div>
                        Genre: {genres.map((eachGenre) => eachGenre).join(", ")}
                    </div>
                ) : genres.length > 0 ? (
                    <div>Genre: {genres[0]}</div>
                ) : (
                    <></>
                )}

                {styles?.length > 1 ? (
                    <div>
                        Style: {styles.map((eachStyle) => eachStyle).join(", ")}
                    </div>
                ) : styles.length > 0 ? (
                    <div>Style: {styles[0]}</div>
                ) : (
                    <></>
                )}
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
