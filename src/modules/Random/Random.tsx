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

const CLEAR_GENRE_ID = "clearGenre";
const CLEAR_STYLE_ID = "clearStyle";
const CLEAR_COUNTRY_ID = "clearCountry";
const MIN_YEAR = 1936;
const currentYear = dayjs().year();

// TODO: Remove hard-coded token, add option to add token to your account. Generally though, add a display in the Randomize page
// that shows how many "randomizations" the user has for a given minute, updates dynamically. Grab the remaining
// randomizations from the api response header, or just reset each minute to authenticated/unauthenticated amount
// https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:home,header:home-rate-limiting
// since it's a rolling window, we can use `setTimeout` when the user clicks the Randomize button, and set the delay to 60 seconds, and
// update the count from there.

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
        <div className="h-full flex flex-row-reverse justify-middle items-center animate-fadeIn animate-duration-[3000ms] gap-10">
            <div className="flex flex-row max-h-[600px] overflow-y-auto"></div>
            <div className="flex flex-col mr-96 mb-40">
                {record === undefined ? (
                    <div className="flex flex-col gap-4 w-[400px] h-[523px]">
                        <div className="skeleton h-[400px] w-[400px]" />
                        <div className="skeleton h-2 w-full" />
                        <div className="skeleton h-2 w-full" />
                        <div className="skeleton h-2 w-full" />
                    </div>
                ) : (
                    <RecordDisplay record={record} />
                )}
                <button
                    className="btn btn-active btn-neutral w-[390px] mt-2 focus:animate-headShake hover:outline transition-all shadow-lg"
                    disabled={!isValid}
                    onClick={getRecord}
                >
                    {"Randomize!"}
                </button>
                {record?.randomizesRemaining !== undefined && (
                    <div className="text-sm text-center pt-2 text-accent text-opacity-75">
                        <span id={Ids.RANDOM.randomizesRemaining}>
                            {record.randomizesRemaining}
                        </span>
                        {" randomizes left"}
                    </div>
                )}
            </div>

            {session?.data.oauthToken !== undefined && (
                <div className="flex flex-col h-fit">
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
            )}
        </div>
    );
};
