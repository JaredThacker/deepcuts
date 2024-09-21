import React from "react";
import { DiscogsRecord } from "../../types/DiscogsRecord";
import { RecordCover } from "./RecordCover/RecordCover";
import { placeholderImageSrc } from "@/common/constants/placeholderImageSrc";

type RecordDisplayProperties = {
    record: DiscogsRecord;
};

export const RecordDisplay = (props: RecordDisplayProperties) => {
    const { record } = props;
    const { images, title, artists, genres, uri, styles, year, labels } =
        record;

    return (
        <div className="card shadow-xl animate-fadeIn">
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
        </div>
    );
};
