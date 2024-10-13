import { placeholderImageSrc } from "@/common/constants/placeholderImageSrc";
import { type Image as RecordImage } from "@/types/Image";
import Image from "next/image";
import React from "react";

type RecordCoverProperties = {
    image?: RecordImage;
    src?: string;
};

export const RecordCover = (props: RecordCoverProperties) => (
    <Image
        alt="Default Record Image"
        id="RecordCover"
        className="h-[400px] w-[400px] hover:cursor-pointer hover:outline mt-3 mb-3 hover:outline-primary"
        height={400}
        width={400}
        src={
            props.src === undefined
                ? props.image?.uri ?? placeholderImageSrc
                : props.src
        }
    />
);
