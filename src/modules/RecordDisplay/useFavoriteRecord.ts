import { Favorite } from "@/types/api/Favorite";
import { QueryClient, useMutation } from "@tanstack/react-query";

/**
 * The parameters of the hook when you call it, e.g. useFavoriteRecord({ queryClient: <the query client instance> })
 */
type UseFavoriteRecordHookParameters = {
    /**
     * The query client instance (MUST BE INSTANTIATED BEFORE BEING PASSED IN)
     */
    queryClient: QueryClient;
};

/**
 * The parameters of the "mutation" function, which is returned from calling this hook
 */
type UseFavoriteRecordFunctionParameters = {
    /**
     * The id of the record we are favoriting
     */
    recordId: number;

    /**
     * The id of the image of the record we are favoriting
     */
    image_uri?: string;
};

/**
 * Favorites a record given the id and the image uri
 *
 * @param recordId - The id of the record we are favoriting
 * @param image_uri - The URI of the image of the record we are favoriting
 * @returns The API response from the server, when we favorite the record
 */
const favoriteRecord = async ({
    recordId,
    image_uri,
}: UseFavoriteRecordFunctionParameters) => {
    /**
     * Sends a POST request to the NextJS API '/favorites' url, with a JSON body of { recordId, imageUri }
     */
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
        { body: JSON.stringify({ recordId, image_uri }), method: "POST" },
    );

    /**
     * Parses the response to JSON (object in js)
     */
    const parsedResponse = await response.json();

    /**
     * Type-casts the object to Favorite type
     */
    return parsedResponse as Favorite;
};

/**
 * The custom hook, which allows for us to pass in a query client, and gain the ability to favorite a record.
 * The purpose of the queryClient is to update the react-query cache, basically the cache is where, when we make a first request, that response is stored in this "cache", so
 * the next time we request the same url, we just return what has already been stored, then make the entire request, therefore speeding up request times.
 *
 * Remember that anything placed after the => WITHOUT BRACES is immediately returned
 *
 * @param queryClient - An instance of the query client, which allows us to manipulate the react-query cache
 * @returns The useMutate return value https://tanstack.com/query/v4/docs/framework/react/reference/useMutation
 */
export const useFavoriteRecord = ({
    queryClient,
}: UseFavoriteRecordHookParameters) =>
    useMutation<Favorite, Error, UseFavoriteRecordFunctionParameters>({
        /**
         * The function that "mutates" the cache
         */
        mutationFn: favoriteRecord,

        /**
         * Fires if the mutation function fires (runs) successfully
         *
         * @param data The data that is returned from "favoriteRecord" (aka parsedResponse)
         */
        onSuccess: (data) => {
            /**
             * Invalidates the queries, causing it to re-fetch (to make sure our query data is up to date)
             */
            queryClient.invalidateQueries({ queryKey: ["favorites"] });

            /**
             * Sets the query data to include the record WE JUST FAVORITED with the old data
             */
            queryClient.setQueryData<Favorite[]>(["favorites"], (oldData) => [
                ...(oldData ?? []),
                data,
            ]);
        },
    });
