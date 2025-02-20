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
import { RangeSlider } from "react-double-range-slider";
import { RangeSliderOutput } from "@/types/components/RangeSlider/RangeSliderOutput";

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

    const onYearChange = React.useCallback(
        (output: RangeSliderOutput) => {
            console.log(output);
        },
        [setValue],
    );

    const selectGenre = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            const { target } = event;
            if (target !== undefined) {
                console.log("in onclick", target);
                const button = target as HTMLElement;
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

    const parsedYearStart = parseNumber(currentYearStart) ?? MIN_YEAR;
    const parsedYearEnd = parseNumber(currentYearEnd) ?? currentYear;

    return (
        <div className="h-full flex flex-row-reverse justify-around items-center animate-fadeIn animate-duration-[3000ms] gap-10">
            <div className="flex flex-col">
                {record !== undefined && <RecordDisplay record={record} />}
                <button
                    className="btn btn-active btn-neutral w-[390px] mt-2 focus:animate-headShake hover:outline transition-all shadow-lg"
                    disabled={!isValid}
                    onClick={getRecord}
                >
                    {"Randomize!"}
                </button>
            </div>
            <div className="flex flex-col gap-2">
                <ul className="menu bg-base-200 rounded--box w-56">
                    <li className="menu-title text-primary flex flex-row gap-5 items-center justify-between">
                        {"Genre"}{" "}
                        <button
                            className="btn btn-xs btn-ghost btn-outline text-primary hover:text-black hover:border-black hover:outline-black hover:bg-primary"
                            id={CLEAR_GENRE_ID}
                            onClick={selectGenre}
                            title="Clear Genres"
                        >
                            <FaTrashCan
                                className="pointer-events-none"
                                size={11}
                            />
                        </button>
                    </li>
                    {genreOptions.map((eachGenre) => (
                        <li key={eachGenre}>
                            <a
                                className={
                                    selectedGenre === eachGenre
                                        ? "pointer-events-none text-opacity-20 text-white bg-gray-500 bg-opacity-50"
                                        : ""
                                }
                                data-genre={eachGenre}
                                id={eachGenre}
                                onClick={selectGenre}
                                title={eachGenre}
                            >
                                {eachGenre}
                            </a>
                        </li>
                    ))}
                </ul>
                <RangeSlider
                    onChange={onYearChange}
                    tooltipVisibility="hover"
                    value={{ min: MIN_YEAR, max: currentYear }}
                />
            </div>
        </div>
    );
};
