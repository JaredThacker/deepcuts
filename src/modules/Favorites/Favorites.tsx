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
        <div className="flex flex-row gap-2 flex-wrap pt-2 pl-2 pb-2 border border-dotted border-accent border-opacity-45 bg-slate-800 bg-opacity-45">
            {favoritesData.map((eachFavorite) => (
                <FavoriteRecord
                    key={eachFavorite.recordid}
                    favoriteRecord={eachFavorite}
                />
            ))}
        </div>
    );
};
