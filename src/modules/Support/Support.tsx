"use client";

import Image from "next/image";
import Link from "next/link";

export const Support = () => {
    const supportEmail = "theofficialdeepcuts@gmail.com";

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="w-[500px] h-[300px]">
                <Image
                    src={"/smiling-memoji.png"}
                    alt="smiling memoji giving you thumbs up for support"
                    width={500}
                    height={300}
                />
            </div>
            <div className="w-52">
                <a
                    href="https://www.buymeacoffee.com/deepcutsofficial"
                    target="_blank"
                >
                    <img
                        src={`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=deepcutsofficial&button_colour=6360fa&font_colour=ffffff&font_family=Comic&outline_colour=ffffff&coffee_colour=724e2c`}
                    />
                </a>
            </div>
            <div className="w-[500px] h-[300px]">
                <Image
                    src={"/smiling-memoji.png"}
                    alt="smiling memoji giving you thumbs up for support"
                    width={500}
                    height={300}
                />
            </div>
            <p>
                {
                    "All support inquiries or questions you may have please contact me at \n"
                }
                <Link
                    href={`mailto:${supportEmail}`}
                    className=" flex flex-row justify-center w-auto btn btn-ghost"
                >
                    <span className="hover:text-cyan-300">{supportEmail}</span>
                </Link>
            </p>
        </div>
    );
};
