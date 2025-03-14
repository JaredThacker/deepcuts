"use client";

import React from "react";
import { emailChecker } from "@/common/regex/emailChecker";
import { Session } from "@/types/api/Session";
import { UserInfo } from "@/types/api/UserInfo";
import { useForm, useWatch } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { editProfile } from "@/helpers/api/profile/edit/editProfile";
import { toast } from "react-toastify";
import { getDirtyValues } from "@/helpers/hook-form/getDirtyValues";
import { parseApiResponseMessages } from "@/helpers/api/parseApiResponseMessages";

type ProfileComponentProperties = {
    readonly userData?: Partial<UserInfo>;
};

type ProfileEditFormValues = Pick<UserInfo, "apiToken" | "email" | "name"> & {
    newPassword: string;
    oldPassword: string;
};

/**
 * The Profile edit page, where the user edits fields of their profile, and hits the "confirm" button
 * to confirm the changes
 *
 * @param props.userData - The partial data fetched from the database regarding the user
 * @returns The component that allows the user to edit their profile
 */
const Profile = ({ userData }: ProfileComponentProperties) => {
    if (userData === undefined) {
        return <span className="invisible" />;
    }

    const { apiToken, email, name } = userData;
    const { control, formState, getValues, register } =
        useForm<ProfileEditFormValues>({
            criteriaMode: "all",
            defaultValues: {
                apiToken,
                email,
                name,
                newPassword: "",
                oldPassword: "",
            },
            mode: "all",
            reValidateMode: "onChange",
        });

    const { errors, dirtyFields, isDirty } = formState;
    const oldPasswordValue = useWatch({ control, name: "oldPassword" });
    const isValid = Object.keys(errors).length === 0 && isDirty;

    const editProfileCallback = React.useCallback(async () => {
        const dirtyValues = getDirtyValues(dirtyFields, getValues());

        if (isValid) {
            const response = await editProfile(dirtyValues);
            parseApiResponseMessages(response);
        }
    }, [isValid, getValues]);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="card card-lg shadow-sm w-3/5 h-3/5">
                <div className="card-body">
                    <div className="text-lg font-bold">{"User Details"}</div>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                            errors.name
                                ? "input-error"
                                : dirtyFields.name
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            placeholder="Username"
                            type="text"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                            })}
                        />
                        <FaUser />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                            errors.email
                                ? "input-error"
                                : dirtyFields.email
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    isEmailValid: (emailValue) =>
                                        emailChecker.test(emailValue)
                                            ? true
                                            : "Email is invalid",
                                },
                            })}
                        />
                        <MdOutlineAlternateEmail />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                            errors.apiToken
                                ? "input-error"
                                : dirtyFields.apiToken
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            placeholder="API Token"
                            type="text"
                            {...register("apiToken")}
                        />
                        <PiCoinVerticalDuotone />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                            errors.oldPassword
                                ? "input-error"
                                : dirtyFields.oldPassword
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            placeholder="Old Password"
                            type="password"
                            {...register("oldPassword")}
                        />
                        <FaKey />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 w-full ${
                            errors.newPassword
                                ? "input-error"
                                : dirtyFields.newPassword
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            disabled={!dirtyFields.oldPassword}
                            placeholder="New Password"
                            type="password"
                            {...register("newPassword", {
                                required: true,
                                validate: {
                                    passwordsDontMatch: (
                                        confirmPasswordValue,
                                    ) =>
                                        confirmPasswordValue ===
                                        oldPasswordValue
                                            ? "Passwords must not match"
                                            : true,
                                },
                            })}
                        />
                    </label>
                </div>
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-primary w-full"
                        disabled={!isValid}
                        onClick={editProfileCallback}
                    >
                        {"Confirm Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Profile, type ProfileEditFormValues };
