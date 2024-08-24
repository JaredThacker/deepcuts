import React from "react";
import { DiscogsRecord } from "../../types/DiscogsRecord";
import { RecordCover } from "./RecordCover/RecordCover";

type RecordDisplayProperties = {
    record: DiscogsRecord;
};

export const RecordDisplay = (props: RecordDisplayProperties) => {
    const { record } = props;
    const { images, title, artists, genres, uri, styles, year, labels } =
        record;

    console.log(record);

    return (
        <div className="card shadow-xl">
            <figure>
                {
                    <a href={uri} target="_blank">
                        <RecordCover
                            image={images.length > 0 ? images[0] : undefined}
                            src={
                                images.length > 0
                                    ? undefined
                                    : "https://community.mp3tag.de/uploads/default/original/2X/a/acf3edeb055e7b77114f9e393d1edeeda37e50c9.png"
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

                <div>Label: {labels[0].name}</div>
                <div>
                    Artist:{" "}
                    {artists.map((eachArtist) => eachArtist.name).join(", ")}
                </div>
                <div>Genre: {genres[0]}</div>

                {styles?.length > 0 ? (
                    <div>Style: {styles[0]}</div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
