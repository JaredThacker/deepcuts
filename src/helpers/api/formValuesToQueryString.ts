type QueryStringFormValues = { [key: string]: unknown };

export const formValuesToQueryString = (
    formValues: QueryStringFormValues,
): string => {
    const queries = [];

    for (const eachKey of Object.keys(formValues)) {
        const value = formValues[eachKey];

        if (
            value === undefined ||
            value === null ||
            Number.isNaN(value) ||
            (value as string)?.length === 0 ||
            (value as unknown[])?.length === 0
        ) {
            continue;
        }

        queries.push(`${eachKey}=${value.toString()}`);
    }

    return `?${queries.join("&")}`;
};
