"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import {
    QueryClient,
    QueryClientProvider,
    QueryFunctionContext,
} from "@tanstack/react-query";

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? ""}/${queryKey[0]}`,
    );
    const response = await result.json();
    return response;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
        },
    },
});

export const QueryProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
};
