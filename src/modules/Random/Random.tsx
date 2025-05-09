"use client";

import React from "react";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";
import { useForm, useWatch } from "react-hook-form";
import { RandomFilter } from "@/types/api/RandomFilter";
import dayjs from "dayjs";
import { parseNumber } from "@/helpers/parseNumber";
import { generateQueryString } from "@/helpers/api/generateQueryString";
import { toast } from "react-toastify";
import { RangeSlider } from "react-double-range-slider";
import { RangeSliderOutput } from "@/types/components/RangeSlider/RangeSliderOutput";
import recordStyles from "@/common/constants/recordStyles";
import { RandomFilterList } from "./RandomFilterList/RandomFilterList";
import recordCountries from "@/common/constants/recordCountries";
import { Ids } from "@/common/constants/Ids";
import { Session } from "@/types/api/Session";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";

type RandomProperties = {
    readonly session?: Session;
};

const DEFAULT_FORM_VALUES: RandomFilter = {
    genre: "",
    style: "",
    country: "",
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

type AccordionStatus = {
    genre: boolean;
    style: boolean;
    country: boolean;
    year: boolean;
};

const DEFAULT_ACCORDION_STATUS: AccordionStatus = {
    genre: false,
    style: false,
    country: false,
    year: false,
};

const CLEAR_GENRE_ID = "clearGenre";
const CLEAR_STYLE_ID = "clearStyle";
const CLEAR_COUNTRY_ID = "clearCountry";
const MIN_YEAR = 1950;
const currentYear = dayjs().year();

export const Random = ({ session }: RandomProperties) => {
    const { control, formState, getValues, register, setValue, watch } =
        useForm<RandomFilter>({
            defaultValues: DEFAULT_FORM_VALUES,
            criteriaMode: "all",
            mode: "all",
            reValidateMode: "onChange",
        });

    const { isValid } = formState;

    const [record, setRecord] = React.useState<DiscogsRecord>();
    const [accordionStatus, setAccordionStatus] =
        React.useState<AccordionStatus>(DEFAULT_ACCORDION_STATUS);

    const updateAccordion = React.useCallback(
        (accordionStatus: keyof AccordionStatus) => () => {
            setAccordionStatus((oldStatus) => ({
                ...oldStatus,
                [accordionStatus]: !oldStatus[accordionStatus],
            }));
        },
        [],
    );

    const onYearChange = React.useCallback(
        (output: RangeSliderOutput) => {
            setValue("yearStart", parseNumber(output.min));
            setValue("yearEnd", parseNumber(output.max));
        },
        [setValue],
    );

    const selectValue = React.useCallback(
        (valueKey: keyof RandomFilter) =>
            (event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                const { target } = event;

                if (target !== undefined) {
                    const button = target as HTMLElement;

                    const { id } = button;

                    const { cancelid } = button.dataset;

                    if (id === cancelid) {
                        setValue(valueKey, undefined);
                    } else {
                        if (id !== undefined) {
                            setValue(valueKey, id);
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

            const { randomizesRemaining } = parsedRecord;
            const attemptsRemaining = document.querySelector(
                `#${Ids.RANDOM.randomizesRemaining}`,
            );

            if (
                attemptsRemaining !== null &&
                randomizesRemaining !== undefined
            ) {
                attemptsRemaining.innerHTML = `${randomizesRemaining}`;
            }
        } else {
            setRecord(parsedRecord);
        }
    };

    const [selectedCountry, selectedGenre, selectedStyle] =
        useWatch<RandomFilter>({
            control,
            name: ["country", "genre", "style"],
        });

    return (
        <div className="h-full flex flex-row-reverse justify-center items-start md:p-0 md:pt-24 md:items-center animate-fadeIn animate-duration-[3000ms] gap-10 overflow-auto lg:overflow-hidden">
            <div className="flex flex-col w-72 min-h-[90%] h-[90%] md:justify-normal justify-between gap-2 lg:gap-0 lg:mb-20">
                {record === undefined ? (
                    <div className="flex flex-col gap-4 w-full md:w-[400px] md:h-[523px] h-full shadow-lg">
                        <div className="skeleton md:h-[400px] md:w-[400px] h-[70%] w-full" />
                        <div className="skeleton h-2 w-full" />
                        <div className="skeleton h-2 w-full" />
                        <div className="skeleton h-2 w-full" />
                    </div>
                ) : (
                    <RecordDisplay record={record} />
                )}
                <div className="w-full md:w-fit">
                    <button
                        className="btn btn-active md:w-[390px] hidden lg:block w-full mt-2 focus:animate-headShake hover:btn-neutral transition-all btn-soft shadow-xl"
                        disabled={!isValid}
                        onClick={getRecord}
                    >
                        {"Randomize!"}
                    </button>
                    <div className="flex flex-col items-center gap-2 lg:hidden">
                        <div className="flex items-center w-full lg:hidden">
                            <button
                                className="btn btn-active md:w-[390px] grow focus:animate-headShake transition-all btn-soft shadow-xl"
                                disabled={!isValid}
                                onClick={getRecord}
                            >
                                {"Randomize!"}
                            </button>
                        </div>
                        <div className="flex w-2/3">
                            <button
                                className="btn btn-active md:w-[390px] grow transition-all btn-soft shadow-xl"
                                onClick={() => {
                                    const element =
                                        document.getElementById("filter_modal");
                                    if (element !== null) {
                                        (
                                            element as HTMLDialogElement
                                        ).showModal();
                                    }
                                }}
                            >
                                Filters{<FaFilter size={10} />}
                            </button>
                        </div>
                        <dialog id="filter_modal" className="modal">
                            <div className="modal-box h-fit w-3/4">
                                <div className="join join-vertical bg-base-100 w-full">
                                    <div
                                        className={`collapse collapse-plus ${
                                            accordionStatus.genre
                                                ? "collapse-open"
                                                : "collapse-close"
                                        } join-item border-base-200 border w-full`}
                                    >
                                        <input
                                            type="radio"
                                            name="filter-accordion-genre"
                                            onClick={updateAccordion("genre")}
                                        />
                                        <div className="collapse-title font-semibold">
                                            Genre
                                        </div>
                                        <div className="collapse-content">
                                            <RandomFilterList
                                                buttonId={CLEAR_GENRE_ID}
                                                callback={selectValue("genre")}
                                                className="flex-nowrap items-center grow w-full"
                                                items={genreOptions}
                                                selectedItem={selectedGenre}
                                                title=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`collapse collapse-plus ${
                                            accordionStatus.style
                                                ? "collapse-open"
                                                : "collapse-close"
                                        } join-item border-base-200 border`}
                                    >
                                        <input
                                            type="radio"
                                            name="filter-accordion-style"
                                            onClick={updateAccordion("style")}
                                        />
                                        <div className="collapse-title font-semibold">
                                            Style
                                        </div>
                                        <div className="collapse-content">
                                            <RandomFilterList
                                                buttonId={CLEAR_STYLE_ID}
                                                callback={selectValue("style")}
                                                className="overflow-y-auto h-full flex-nowrap items-center grow w-full"
                                                items={recordStyles}
                                                selectedItem={selectedStyle}
                                                title=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`collapse collapse-plus ${
                                            accordionStatus.country
                                                ? "collapse-open"
                                                : "collapse-close"
                                        } join-item border-base-200 border`}
                                    >
                                        <input
                                            type="radio"
                                            name="filter-accordion"
                                            onClick={updateAccordion("country")}
                                        />
                                        <div className="collapse-title font-semibold">
                                            Country
                                        </div>
                                        <div className="collapse-content">
                                            <RandomFilterList
                                                buttonId={CLEAR_COUNTRY_ID}
                                                callback={selectValue(
                                                    "country",
                                                )}
                                                className="flex-nowrap overflow-y-auto items-center grow w-full h-full"
                                                items={recordCountries}
                                                selectedItem={selectedCountry}
                                                title=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`collapse collapse-plus ${
                                            accordionStatus.year
                                                ? "collapse-open"
                                                : "collapse-close"
                                        } join-item border-base-200 border`}
                                    >
                                        <input
                                            type="radio"
                                            name="filter-accordion"
                                            onClick={updateAccordion("year")}
                                        />
                                        <div className="collapse-title font-semibold">
                                            Year
                                        </div>
                                        <div className="collapse-content w-60">
                                            <RangeSlider
                                                onChange={onYearChange}
                                                tooltipVisibility="always"
                                                value={{
                                                    min: MIN_YEAR,
                                                    max: currentYear,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>Close</button>
                            </form>
                        </dialog>
                    </div>
                    {record?.randomizesRemaining !== undefined && (
                        <div className="text-sm text-center pt-2 text-accent text-opacity-75">
                            <span id={Ids.RANDOM.randomizesRemaining}>
                                {record.randomizesRemaining}
                            </span>
                            {" randomizes left"}
                        </div>
                    )}
                </div>
            </div>

            {session?.data.oauthToken !== undefined ? (
                <div className="hidden flex-col h-fit lg:flex">
                    <div className="flex flex-row gap-6 h-[37rem]">
                        <RandomFilterList
                            buttonId={CLEAR_GENRE_ID}
                            callback={selectValue("genre")}
                            className="flex-nowrap"
                            items={genreOptions}
                            selectedItem={selectedGenre}
                            title="Genre"
                        />
                        <RandomFilterList
                            buttonId={CLEAR_STYLE_ID}
                            callback={selectValue("style")}
                            className="overflow-y-auto h-full flex-nowrap"
                            items={recordStyles}
                            selectedItem={selectedStyle}
                            title="Style"
                        />
                        <RandomFilterList
                            buttonId={CLEAR_COUNTRY_ID}
                            callback={selectValue("country")}
                            className="flex-nowrap overflow-y-auto h-full"
                            items={recordCountries}
                            selectedItem={selectedCountry}
                            title="Country"
                        />
                    </div>

                    <RangeSlider
                        onChange={onYearChange}
                        tooltipVisibility="hover"
                        value={{ min: MIN_YEAR, max: currentYear }}
                    />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-[37rem] bg-base-300">
                    <p className="p-5 text-info">
                        {
                            "YOU MUST AUTHENTICATE WITH YOUR DISCOGS API TOKEN TO USE FILTERS!!!!!"
                        }
                    </p>

                    <div className="">
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.discogs.com/settings/developers"
                            className="hover:text-cyan-300 text-lg"
                        >
                            {"Generate personal access token here!"}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
