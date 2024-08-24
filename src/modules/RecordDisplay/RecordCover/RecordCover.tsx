import { Image } from "@/types/Image";
import React from "react";

type RecordCoverProperties = {
    image?: Image;

    /**
     * Custom hard-coded source
     */
    src?: string;
};

export const RecordCover = (props: RecordCoverProperties) => (
    <img
        alt="Default Record Image"
        className="h-40 w-40"
        height={300}
        width={300}
        src={props.src === undefined ? props.image?.uri : props.src}
    />
);
