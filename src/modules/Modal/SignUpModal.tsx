import { Ids } from "@/common/constants/Ids";
import { signUp } from "@/helpers/api/signup/signUp";
import React from "react";
import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Key } from "ts-key-enum";

type SignUpModalProperties = {
    onHide: Function;
    show: boolean;
};

export type SignUpFormValues = {
    confirmPassword: string;
    email: string;
    password: string;
    username: string;
};

const defaultSignUpFormValues: SignUpFormValues = {
    confirmPassword: "",
    email: "",
    password: "",
    username: "",
};

// <LoginModal show={boolean value} />

export const SignUpModal = (props: SignUpModalProperties) => {
    const { formState, getValues, register, reset, resetField, watch } =
        useForm<SignUpFormValues>({
            criteriaMode: "all",
            defaultValues: defaultSignUpFormValues,
            mode: "all",
            reValidateMode: "onChange",
        });

    const { dirtyFields, errors, isValid } = formState;
    const { password: passwordIsDirty } = dirtyFields;
    const passwordWatchValue = watch("password");

    const onHide = () => {
        if (props.onHide) {
            props.onHide(false);
            reset();
        }
    };

    const onSignUp = async () => {
        const values = getValues();
        await signUp(values);
        onHide();
    };

    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isValid) {
            await onSignUp();
        } else {
            event.preventDefault();
        }
    };

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDialogElement>) => {
        const { key } = event;
        if (key === Key.Enter && isValid) {
            await onSignUp();
            const signUpForm = document.getElementById(Ids.MODAL.SIGN_UP_FORM);
            if (signUpForm !== null) {
                (signUpForm as HTMLFormElement).submit();
            }
        }
    };

    const disableButton = !isValid;

    React.useEffect(() => {
        if (props.show) {
            const modal = document.getElementById(Ids.MODAL.SIGN_UP);
            if (modal !== null) {
                (modal as HTMLDialogElement).showModal();
            }
        }
    }, [props.show]);

    React.useEffect(() => {
        if (!passwordIsDirty) {
            resetField("confirmPassword");
        }
    }, [passwordIsDirty]);

    return (
        <dialog
            id={Ids.MODAL.SIGN_UP}
            className="modal modal-bottom sm:modal-middle"
            onKeyDown={onKeyDown}
        >
            <div className="modal-box">
                <h1 className="font-bold text-2xl">{"Register"}</h1>
                <div className="py-4 flex flex-col gap-4">
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 ${
                            errors.username
                                ? "input-error"
                                : dirtyFields.username
                                ? "input-success"
                                : ""
                        }`}
                    >
                        <input
                            autoComplete="off"
                            className="grow"
                            placeholder="Username"
                            type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                            })}
                        />
                        <FaUser />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 ${
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
                            {...register("email", { required: true })}
                        />
                        <MdOutlineAlternateEmail />
                    </label>
                    <label
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 ${
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
                        className={`input input-bordered placeholder-gray-500/75 flex items-center gap-2 ${
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
                                        confirmPasswordValue ===
                                        passwordWatchValue
                                            ? true
                                            : "Passwords must match",
                                },
                            })}
                        />
                    </label>
                </div>
                <div className="modal-action">
                    <form
                        className="flex flex-row gap-3"
                        id={Ids.MODAL.SIGN_UP_FORM}
                        method="dialog"
                    >
                        <button
                            className="btn btn-secondary"
                            disabled={disableButton}
                            onClick={onClick}
                        >
                            {"Sign Up"}
                        </button>
                        <button className="btn" onClick={onHide} type="submit">
                            {"Close"}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
