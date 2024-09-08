export const decryptProfileInfo = (encryptedSession: string): string => {
    const xorKey = process.env.XOR_KEY ?? "";

    const decryptedSession = encryptedSession
        .split("")
        .map(
            (eachCharacter, index) =>
                eachCharacter.charCodeAt(0) ^ xorKey.charCodeAt(index),
        )
        .map((encryptedChar) => String.fromCharCode(encryptedChar))
        .join("");

    return decryptedSession;
};
