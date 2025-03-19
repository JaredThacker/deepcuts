"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Favorite } from "@/types/api/Favorite";
import { FavoriteRecord } from "./FavoriteRecord";
import { generateRecordTooltip } from "@/helpers/api/record/generateRecordTooltip";
import { visitRecord } from "@/helpers/components/FavoriteRecord/visitRecord";

export const FavoritesPage = () => {
    const { data: favoritesData } = useQuery<Favorite[]>({
        queryKey: ["favorites"],
    });

    const onClick = React.useCallback(
        (_favorite: Favorite) => () => {
            visitRecord(_favorite.recordid);
        },
        [],
    );

    if (favoritesData === undefined) {
        return <span />;
    }

    return (
        <div className="flex flex-col items-center gap-4 flex-wrap w-full">
            {favoritesData.map((eachFavorite) => (
                <div
                    className="w-[85%] flex flex-row gap-2 items-center bg-base-300 rounded py-2 px-6"
                    key={eachFavorite.recordid}
                >
                    <FavoriteRecord
                        customImageClassName="h-20 w-20"
                        displayTooltip={false}
                        favoriteRecord={eachFavorite}
                        imageContent={
                            <div className="text-sm p-1 font-bold">
                                {generateRecordTooltip(eachFavorite)}
                            </div>
                        }
                        onClick={onClick(eachFavorite)}
                    />
                </div>
            ))}
        </div>
    );
};
