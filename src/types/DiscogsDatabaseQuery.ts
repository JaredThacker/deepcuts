import { DiscogsRecord } from "./DiscogsRecord";

type DiscogsDatabaseQueryPagination = {
    per_page: number;
    pages: number;
    page: number;
    urls: {
        last: string;
        next: string;
    };
    items: number;
};

export type DiscogsDatabaseQuery = {
    pagination: DiscogsDatabaseQueryPagination;
    results: DiscogsRecord[];
};
