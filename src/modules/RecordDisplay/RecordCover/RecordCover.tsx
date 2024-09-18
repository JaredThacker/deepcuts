// @ts-nocheck
import { type Image } from "@/types/Image";
import Image from "next/image";
import React from "react";

type RecordCoverProperties = {
    image?: Image;
    src?: string;
};

export const RecordCover = (props: RecordCoverProperties) => (
    <Image
        alt="Default Record Image"
        id="RecordCover"
        className="h-50 w-50 hover:cursor-pointer"
        height={300}
        width={300}
        src={props.src === undefined ? props.image?.uri : props.src}
    />
);
