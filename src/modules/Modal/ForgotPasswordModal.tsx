import React from "react";
import { Ids } from "@/common/constants/Ids";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { Key } from "ts-key-enum";
import { emailChecker } from "@/common/regex/emailChecker";
import { toast } from "react-toastify";
import { forgotPassword } from "@/helpers/api/password/forgotPassword";

type ForgotPasswordModalProperties = {
    onHide: Function;
    show: boolean;
};

export type ForgotPasswordModalFormValues = {
    email: string;
};

const defaultForgotPasswordFormValues: ForgotPasswordModalFormValues = {
    email: "",
};

export const ForgotPasswordModal = (props: ForgotPasswordModalProperties) => {
    const { formState, getValues, register, reset, resetField, watch } =
        useForm<ForgotPasswordModalFormValues>({
            criteriaMode: "all",
            defaultValues: defaultForgotPasswordFormValues,
            mode: "all",
            reValidateMode: "onChange",
        });

    const { dirtyFields, errors, isValid } = formState;

    const onHide = React.useCallback(() => {
        if (props.onHide) {
            props.onHide(false);
            reset();
        }
    }, [props.onHide, reset]);

    const onForgotPassword = async () => {
        const values = getValues();
        const loadingToast = toast.loading("Sending email...");

        const didSendEmail = await forgotPassword(values);

        if (didSendEmail) {
            toast.update(loadingToast, {
                autoClose: 2000,
                isLoading: false,
                render: "Successfully sent email!",
                type: "success",
            });
        } else {
            toast.update(loadingToast, {
                autoClose: 2000,
                isLoading: false,
                render: "Failed to send email, double check email entered.",
                type: "error",
            });
        }
        onHide();
    };

    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isValid) {
            await onForgotPassword();
        } else {
            event.preventDefault();
        }
    };

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDialogElement>) => {
        const { key } = event;
        if (key === Key.Enter && isValid) {
            await onForgotPassword();
            const forgotPasswordForm = document.getElementById(
                Ids.MODAL.FORGOT_PASSWORD_FORM,
            );
            if (forgotPasswordForm !== null) {
                (forgotPasswordForm as HTMLFormElement).submit();
            }
        } else if (key === Key.Escape) {
            event.preventDefault();
        }
    };

    const disableButton = !isValid;

    React.useEffect(() => {
        if (props.show) {
            const modal = document.getElementById(Ids.MODAL.FORGOT_PASSWORD);
            if (modal !== null) {
                (modal as HTMLDialogElement).showModal();
            }
        }
    }, [props.show]);

    return (
        <dialog
            id={Ids.MODAL.FORGOT_PASSWORD}
            className="modal modal-bottom sm:modal-middle"
            onKeyDown={onKeyDown}
        >
            <div className="modal-box">
                <h1 className="font-bold text-2xl">
                    {"Enter Credentials Here"}
                </h1>
                <div className="py-4 flex flex-col gap-4">
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
                            type="text"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                                validate: {
                                    isEmailValid: (emailValue) =>
                                        emailChecker.test(emailValue)
                                            ? true
                                            : "Email is invalid",
                                },
                            })}
                        />
                        <FaUser />
                    </label>
                </div>
                <div className="modal-action">
                    <form
                        className="flex flex-row gap-3"
                        id={Ids.MODAL.FORGOT_PASSWORD_FORM}
                        method="dialog"
                    >
                        <button
                            className="btn btn-primary enabled:btn-outline"
                            disabled={disableButton}
                            onClick={onClick}
                        >
                            {"Forgot Password"}
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
