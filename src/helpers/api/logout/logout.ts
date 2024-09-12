/**
 * Logs the user out
 *
 * @returns Boolean that represents if the response status code was a 204
 */
export const logout = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/logout`,
        { method: "POST" },
    );

    const responseString = await response.text();

    return responseString === "success";
};
