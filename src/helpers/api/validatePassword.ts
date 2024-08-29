import { pbkdf2Sync, randomBytes } from "crypto";
import { normalizeBytes } from "./normalizeBytes";

/**
 *
 * @param password
 * @returns
 */
export const validatePassword = (
    password: string,
    salt: string,
    databasePassword: string,
): boolean => {
    const encryptedDatabasePassword = normalizeBytes(
        pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("utf-8"),
    );

    return encryptedDatabasePassword === databasePassword;
};
