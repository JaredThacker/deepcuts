"use client";

import React from "react";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";
import { useForm } from "react-hook-form";
import { RandomFilterFormValues } from "@/types/form/RandomFilterFormValues";
import { RandomFilter } from "@/types/api/RandomFilter";

const DEFAULT_FORM_VALUES: RandomFilter = {
    genre: "",
};

export const Random = () => {
    const { register } = useForm<RandomFilter>({
        defaultValues: DEFAULT_FORM_VALUES,
        criteriaMode: "all",
        mode: "all",
        reValidateMode: "onChange",
    });
    const [record, setRecord] = React.useState<DiscogsRecord>();

    const getRecord = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/record`,
        );
        const parsedResponse = await response.json();
        const parsedRecord = parsedResponse as DiscogsRecord;
        setRecord(parsedRecord);
    };

    return (
        <div className="h-full flex flex-col justify-center items-center animate-fadeIn animate-duration-[3000ms] gap-10">
            {record !== undefined && <RecordDisplay record={record} />}
            <button
                className="btn btn-active btn-neutral w-[390px] mt-2 focus:animate-headShake hover:outline transition-all shadow-lg"
                onClick={getRecord}
            >
                {"Randomize!"}
            </button>
            <div className="flex flex-row gap-3">
                <details className="dropdown">
                    <summary className="btn m-1">{"Genre"}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <a>{"Rock"}</a>
                        </li>
                        <li>
                            <a>{"Electronic"}</a>
                        </li>
                        <li>
                            <a>{"Pop"}</a>
                        </li>
                        <li>
                            <a>{"Funk / Soul"}</a>
                        </li>
                        <li>
                            <a>{"Folk, World, & Country"}</a>
                        </li>
                        <li>
                            <a>{"Jazz"}</a>
                        </li>
                        <li>
                            <a>{"Classical"}</a>
                        </li>
                        <li>
                            <a>{"Hip Hop"}</a>
                        </li>
                        <li>
                            <a>{"Stage & Screen"}</a>
                        </li>
                        <li>
                            <a>{"Reggae"}</a>
                        </li>
                        <li>
                            <a>{"Latin"}</a>
                        </li>
                        <li>
                            <a>{"Blues"}</a>
                        </li>
                        <li>
                            <a>{"Non-Music"}</a>
                        </li>
                        <li>
                            <a>{"Children's"}</a>
                        </li>
                        <li>
                            <a>{"Brass & Military"}</a>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
};
