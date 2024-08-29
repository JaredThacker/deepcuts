const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+{}[]:\"'<>,./?\\~`";

export const normalizeBytes = (password: string): string =>
    password
        .split("")
        .map((_, eachCharIndex) =>
            alphabet.charAt(
                password.charCodeAt(eachCharIndex) % alphabet.length,
            ),
        )
        .join("");
