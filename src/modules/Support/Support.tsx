"use client";

import Image from "next/image";
import Link from "next/link";

export const Support = () => {
    const supportEmail = "theofficialdeepcuts@gmail.com";

    return (
        <div className="flex flex-col h-full w-full items-center justify-center gap-7">
            <div className="flex flex-col justify-center text-wrap h-64 w-2/3 animate-fadeIn animate-duration-[2000ms] text-center">
                <h1 className="text-3xl">{"FAQ:"}</h1>
                <p className="text-info whitespace-pre-line">
                    {
                        "\nQ: When I randomize, why does my amount remaining go down by more than one sometimes?\n"
                    }
                </p>
                <p className="whitespace-pre-line">
                    {
                        "\nA: Due to the nature of the algorithm fetching these random releases from the Discogs API, sometimes it lands on a release number that does not exist. When that happens, it will re-roll but the API request still counts towards your rate limit."
                    }
                </p>
                <p className="text-info whitespace-pre-line">
                    {"\nQ: What is a rate limit?"}
                </p>
                <p className="whitespace-pre-line">
                    {
                        "\nA: The rate limit is the amount of requests your IP address can make to the Discogs API per rolling minute. You will notice when you make a request without filters it will start around 60, and if you make one with filters it will start around 25. As far as I can tell, these limits are independent of each other and using one does not affect the other. Authenticated users should have 60 unfiltered requests and 25 filtered requests per rolling minute!"
                    }
                </p>
            </div>

            <p className="whitespace-pre-line animate-fadeIn animate-duration-[2000ms] text-accent">
                {
                    "\nAll support inquiries, questions, or feature requests you may have please contact me at"
                }
                <Link
                    target="_blank"
                    href={`mailto:${supportEmail}`}
                    className="w-64 btn btn-ghost ml-3 hover:text-cyan-300"
                >
                    <span className="">{supportEmail}</span>
                </Link>
            </p>
            <div className="w-52 animate-fadeIn animate-duration-[2000ms]">
                <a
                    href="https://www.buymeacoffee.com/deepcutsofficial"
                    target="_blank"
                >
                    <Image
                        alt="Buy me coffee"
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
                    className="animate-bounceInLeft animate-duration-[2000ms]"
                />
            </div>
        </div>
    );
};
