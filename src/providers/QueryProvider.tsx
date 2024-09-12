"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const QueryProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    );
};
