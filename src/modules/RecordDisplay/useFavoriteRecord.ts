import { Favorite } from "@/types/api/Favorite";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";

type UseFavoriteRecordHookParameters = {
    queryClient: QueryClient;
};

type UseFavoriteRecordFunctionParameters = {
    recordId: number;
};

const favoriteRecord = async ({
    recordId,
}: UseFavoriteRecordFunctionParameters) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
        { body: JSON.stringify({ recordId }), method: "POST" },
    );

    const parsedResponse = await response.json();
    return parsedResponse as Favorite;
};

export const useFavoriteRecord = ({
    queryClient,
}: UseFavoriteRecordHookParameters) =>
    useMutation<Favorite, Error, UseFavoriteRecordFunctionParameters>({
        mutationFn: favoriteRecord,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });

            queryClient.setQueryData<Favorite[]>(["favorites"], (oldData) => [
                ...(oldData ?? []),
                data,
            ]);
        },
    });
