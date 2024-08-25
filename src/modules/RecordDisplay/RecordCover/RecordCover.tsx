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
    <picture>
        <img
            alt="Default Record Image"
            id="RecordCover"
            className="h-50 w-50"
            height={300}
            width={300}
            src={props.src === undefined ? props.image?.uri : props.src}
        />
    </picture>
);
