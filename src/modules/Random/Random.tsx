"use client";

import React from "react";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";
import { useForm, useWatch } from "react-hook-form";
import { RandomFilterFormValues } from "@/types/form/RandomFilterFormValues";
import { RandomFilter } from "@/types/api/RandomFilter";
import { FaTrashCan } from "react-icons/fa6";
import dayjs from "dayjs";
import { parseNumber } from "@/helpers/parseNumber";
import { generateQueryString } from "@/helpers/api/generateQueryString";
import { toast } from "react-toastify";

const DEFAULT_FORM_VALUES: RandomFilter = {
    genre: "",
};

const genreOptions = [
    "Rock",
    "Electronic",
    "Pop",
    "Funk / Soul",
    "Folk, World, & Country",
    "Jazz",
    "Classical",
    "Hip Hop",
    "Stage & Screen",
    "Reggae",
    "Latin",
    "Blues",
    "Non-Music",
    "Children's",
    "Brass & Military",
];

const CLEAR_GENRE_ID = "clearGenre";
const MIN_YEAR = 1936;
const currentYear = dayjs().year();

// TODO: Remove hard-coded token, add option to add token to your account. Generally though, add a display in the Randomize page
// that shows how many "randomizations" the user has for a given minute, updates dynamically. Grab the remaining
// randomizations from the api response header, or just reset each minute to authenticated/unauthenticated amount
// https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:home,header:home-rate-limiting
// since it's a rolling window, we can use `setTimeout` when the user clicks the Randomize button, and set the delay to 60 seconds, and
// update the count from there.

// TODO: Redesign Random page potentially, because genre dropdown causes overflow.
export const Random = () => {
    const { control, formState, getValues, register, setValue, watch } =
        useForm<RandomFilter>({
            defaultValues: DEFAULT_FORM_VALUES,
            criteriaMode: "all",
            mode: "all",
            reValidateMode: "onChange",
        });

    const { errors, isValid } = formState;

    const [record, setRecord] = React.useState<DiscogsRecord>();

    const selectGenre = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const { target } = event;
            if (target !== undefined) {
                console.log("in onclick", target);
                const button = target as HTMLButtonElement;
                const { id } = button;

                if (id === CLEAR_GENRE_ID) {
                    setValue("genre", undefined);
                } else {
                    const { genre } = button.dataset;
                    if (genre !== undefined) {
                        setValue("genre", genre);
                    }
                }
            }
        },
        [setValue],
    );

    const getRecord = async () => {
        console.log(getValues());

        const queryString = generateQueryString(getValues());

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/record${queryString}`,
        );
        const parsedResponse = await response.json();
        const parsedRecord = parsedResponse as DiscogsRecord;

        if (parsedRecord.errorMessage !== undefined) {
            toast.error(parsedRecord.errorMessage, { pauseOnHover: false });
        } else {
            setRecord(parsedRecord);
        }
    };

    const [currentYearStart, currentYearEnd, selectedGenre] =
        useWatch<RandomFilter>({
            control,
            name: ["yearStart", "yearEnd", "genre"],
        });

    return (
        <div className="h-full flex flex-col justify-center items-center animate-fadeIn animate-duration-[3000ms] gap-10">
            {record !== undefined && <RecordDisplay record={record} />}
            <button
                className="btn btn-active btn-neutral w-[390px] mt-2 focus:animate-headShake hover:outline transition-all shadow-lg"
                disabled={!isValid}
                onClick={getRecord}
            >
                {"Randomize!"}
            </button>
            <div className="flex flex-row gap-3">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {"Genre"}
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content card card-compact border-none bg-transparent text-primary-content z-[1] w-[30rem] p-2"
                    >
                        <div className="card-body flex-row flex-wrap">
                            {genreOptions.map((eachGenre) => (
                                <button
                                    className="btn btn-sm btn-ghost btn-outline text-primary hover:text-black hover:border-black hover:outline-black hover:bg-primary"
                                    data-genre={eachGenre}
                                    disabled={selectedGenre === eachGenre}
                                    id={`genre_${eachGenre}`}
                                    key={eachGenre}
                                    onClick={selectGenre}
                                >
                                    {eachGenre}
                                </button>
                            ))}
                            <button
                                className="btn btn-sm btn-ghost btn-outline text-primary hover:text-black hover:border-black hover:outline-black hover:bg-primary"
                                id={CLEAR_GENRE_ID}
                                onClick={selectGenre}
                            >
                                <FaTrashCan className="pointer-events-none" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-primary text-center">
                        {"Year"}
                    </div>
                    <input
                        className={`${
                            errors?.yearStart === undefined
                                ? "border-transparent"
                                : "border-red-500"
                        } rounded-sm shadow border-opacity-50 transition-colors border focus:outline-none`}
                        type="number"
                        min={MIN_YEAR}
                        max={currentYear}
                        {...register("yearStart", {
                            validate: {
                                beforeYearEnd: (currentStart) => {
                                    if (
                                        currentStart === undefined ||
                                        Number.isNaN(currentStart)
                                    ) {
                                        return true;
                                    }

                                    const isBefore =
                                        currentStart <=
                                        (parseNumber(currentYearEnd) ??
                                            currentYear);

                                    return isBefore;
                                },
                            },
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="h-full flex flex-col justify-center text-xl text-primary">
                    {"—"}
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-primary text-center">
                        {"Year"}
                    </div>
                    <input
                        className={`${
                            errors?.yearEnd === undefined
                                ? "border-transparent"
                                : "border-red-500"
                        } rounded-sm shadow border-opacity-50 transition-colors border focus:outline-none`}
                        type="number"
                        min={MIN_YEAR}
                        max={currentYear}
                        {...register("yearEnd", {
                            validate: {
                                afterYearStart: (currentEnd) => {
                                    if (
                                        currentEnd === undefined ||
                                        Number.isNaN(currentEnd)
                                    ) {
                                        return true;
                                    }

                                    const isAfter =
                                        currentEnd >=
                                        (parseNumber(currentYearStart) ??
                                            MIN_YEAR);

                                    return isAfter;
                                },
                            },
                            valueAsNumber: true,
                        })}
                    />
                </div>
            </div>
        </div>
    );
};
