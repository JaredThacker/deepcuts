import { pbkdf2Sync, randomBytes } from "crypto";
import { normalizeBytes } from "./normalizeBytes";

type EncryptionResult = {
    hash: string;
    salt: string;
};

const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+{}[]:\"'<>,./?\\~`";

/**
 *
 * @param password
 * @returns
 */
export const encryptPassword = (password: string): EncryptionResult => {
    const salt = normalizeBytes(randomBytes(16).toString("utf-8"));
    const encryptedPassword = pbkdf2Sync(
        password,
        salt,
        1000,
        64,
        "sha512",
    ).toString("utf-8");

    const mappedEncrypted = normalizeBytes(encryptedPassword);

    return { hash: mappedEncrypted, salt };
};
