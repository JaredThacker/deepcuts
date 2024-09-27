import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Favorite } from "@/types/api/Favorite";
import { FavoriteRecord } from "./FavoriteRecord";

type FavoriteProperties = {
    favorite: Favorite;
};

export const Favorites = () => {
    const { data: favoritesData } = useQuery({ queryKey: ["favorites"] });

    if (favoritesData === undefined) {
        return <span />;
    }

    return (
        // <div className="flex flex-row gap-2 flex-wrap">
        //     <FavoriteRecord
        //         key={`favorite_record_${favorite.recordid}`}
        //         favoriteRecord={favorite}
        //     />
        // </div>
        <div>{JSON.stringify(favoritesData)}</div>
    );
};
