import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Favorite } from "@/types/api/Favorite";
import { FavoriteRecord } from "./FavoriteRecord";

export const Favorites = () => {
    const { data: favoritesData } = useQuery<Favorite[]>({
        queryKey: ["favorites"],
    });

    if (favoritesData === undefined) {
        return <span />;
    }

    return (
        <div className="flex flex-row justify-end gap-2 p-3 rounded bg-base-200 shadow-md">
            <div
                className="flex flex-row gap-2 flex-wrap"
                style={{ maxWidth: "70%" }}
            >
                {favoritesData.map((eachFavorite) => (
                    <FavoriteRecord
                        key={eachFavorite.recordid}
                        favoriteRecord={eachFavorite}
                    />
                ))}
            </div>
        </div>
    );
};
