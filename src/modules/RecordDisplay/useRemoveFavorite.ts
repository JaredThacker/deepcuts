import { Favorite } from "@/types/api/Favorite";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";

type UseFavoriteRecordHookParameters = {
    queryClient: QueryClient;
};

type UseFavoriteRecordFunctionParameters = {
    id: number;
};

const removeFavorite = async ({ id }: UseFavoriteRecordFunctionParameters) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
        { body: JSON.stringify({ id }), method: "DELETE" },
    );

    const parsedResponse = await response.json();
    return parsedResponse as Favorite;
};

export const useRemoveFavorite = ({
    queryClient,
}: UseFavoriteRecordHookParameters) =>
    useMutation<Favorite, Error, UseFavoriteRecordFunctionParameters>({
        mutationFn: removeFavorite,
        onSuccess: (data) => {
            queryClient.setQueryData<Favorite[]>(["favorites"], (oldData) => {
                if (oldData !== undefined) {
                    return [...oldData].filter(
                        (eachRecord) => eachRecord.id !== data.id,
                    );
                }

                return [];
            });
        },
    });
