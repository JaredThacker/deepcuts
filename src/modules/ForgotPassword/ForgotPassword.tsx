"use client";
import { changePassword } from "@/helpers/api/password/changePassword";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import { Key } from "ts-key-enum";

export type ForgotPasswordProperties = {
    readonly token: string;
    readonly email: string;
};

export type ForgotPasswordFormValues = {
    confirmPassword: string;
    password: string;
};

const defaultForgotPasswordFormValues: ForgotPasswordFormValues = {
    confirmPassword: "",
    password: "",
};

export const ForgotPassword = ({
    email,
    token,
}: ForgotPasswordProperties): React.JSX.Element => {
    const { formState, getValues, register, reset, watch } =
        useForm<ForgotPasswordFormValues>({
            criteriaMode: "all",
            defaultValues: defaultForgotPasswordFormValues,
            mode: "all",
            reValidateMode: "onChange",
        });

    const { dirtyFields, errors, isValid } = formState;
    const passwordWatchValue = watch("password");
    const disableButton = !isValid || Object.keys(dirtyFields).length != 2;
    const router = useRouter();

    const onChangePassword = React.useCallback(async () => {
        const values = getValues();

        if (!disableButton) {
            const changedPassword = await changePassword({
                ...values,
                email,
                token,
            });

            if (changedPassword) {
                toast.success("Successfully changed password!");
                router.push("/");
            } else {
                toast.error(
                    "Failed to update password, please try again, or re-send email.",
                );
            }
        }
    }, [getValues, disableButton, email, token]);

    const onKeyDown = React.useCallback(
        async (event: React.KeyboardEvent<HTMLDivElement>) => {
            const { key } = event;
            if (key === Key.Enter && isValid) {
                await onChangePassword();
            } else if (key === Key.Escape) {
                event.preventDefault();
                reset();
            }
        },
        [onChangePassword, reset],
    );

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col w-1/2 gap-5" onKeyDown={onKeyDown}>
                <label
                    className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                        errors.password
                            ? "input-error"
                            : dirtyFields.password
                            ? "input-success"
                            : ""
                    }`}
                >
                    <input
                        autoComplete="off"
                        className="grow"
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <FaKey />
                </label>
                <label
                    className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                        errors.confirmPassword
                            ? "input-error"
                            : dirtyFields.confirmPassword
                            ? "input-success"
                            : ""
                    }`}
                >
                    <input
                        autoComplete="off"
                        className="grow"
                        disabled={!dirtyFields.password}
                        placeholder="Confirm Password"
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: {
                                passwordsMatch: (confirmPasswordValue) =>
                                    confirmPasswordValue === passwordWatchValue
                                        ? true
                                        : "Passwords must match",
                            },
                        })}
                    />
                </label>
            </div>
            <button
                className="btn btn-primary w-1/4"
                disabled={disableButton}
                onClick={onChangePassword}
            >
                {"Change Password"}
            </button>
        </div>
    );
};
