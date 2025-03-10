import React from "react";
import { Ids } from "@/common/constants/Ids";
import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { login } from "@/helpers/api/login/login";
import { Key } from "ts-key-enum";
import { useRouter } from "next/navigation";
import { emailChecker } from "@/common/regex/emailChecker";
import { toast } from "react-toastify";
import { Routes } from "@/common/routes/Routes";

type LoginModalProperties = {
    onHide: Function;
    show: boolean;
};

export type LoginFormValues = {
    email: string;
    password: string;
};

const defaultLoginFormValues: LoginFormValues = {
    email: "",
    password: "",
};

export const LoginModal = (props: LoginModalProperties) => {
    const { formState, getValues, register, reset, resetField, watch } =
        useForm<LoginFormValues>({
            criteriaMode: "all",
            defaultValues: defaultLoginFormValues,
            mode: "all",
            reValidateMode: "onChange",
        });

    const router = useRouter();

    const { dirtyFields, errors, isValid } = formState;

    const onHide = () => {
        if (props.onHide) {
            props.onHide(false);
            reset();
        }
    };

    const onLogin = async () => {
        const values = getValues();
        const loadingToast = toast.loading("Logging in...");

        const didLogin = await login(values);

        if (didLogin) {
            toast.update(loadingToast, {
                autoClose: 2000,
                isLoading: false,
                render: "Logged in successfully!",
                type: "success",
            });
            router.push(Routes.DASHBOARD);
        } else {
            toast.update(loadingToast, {
                autoClose: 2000,
                isLoading: false,
                render: "Failed to login.",
                type: "error",
            });
        }
        onHide();
    };

    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isValid) {
            await onLogin();
        } else {
            event.preventDefault();
        }
    };

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDialogElement>) => {
        const { key } = event;
        if (key === Key.Enter && isValid) {
            await onLogin();
            const signUpForm = document.getElementById(Ids.MODAL.SIGN_UP_FORM);
            if (signUpForm !== null) {
                (signUpForm as HTMLFormElement).submit();
            }
        } else if (key === Key.Escape) {
            event.preventDefault();
        }
    };

    const disableButton = !isValid;

    React.useEffect(() => {
        if (props.show) {
            const modal = document.getElementById(Ids.MODAL.LOGIN);
            if (modal !== null) {
                (modal as HTMLDialogElement).showModal();
            }
        }
    }, [props.show]);

    return (
        <dialog
            id={Ids.MODAL.LOGIN}
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
                </div>
                <div className="modal-action">
                    <form
                        className="flex flex-row gap-3"
                        id={Ids.MODAL.LOGIN}
                        method="dialog"
                    >
                        <button
                            className="btn btn-primary enabled:btn-outline"
                            disabled={disableButton}
                            onClick={onClick}
                        >
                            {"Log In"}
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
