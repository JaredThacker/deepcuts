import React from "react";
import { useQuery } from "@tanstack/react-query";

export const Favorites = () => {
    const { data: favoritesData } = useQuery({ queryKey: ["favorites"] });

    if (favoritesData === undefined) {
        return <span />;
    }

    return <div>{JSON.stringify(favoritesData)}</div>;
};
