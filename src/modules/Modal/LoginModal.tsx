import React from "react";
import { Ids } from "@/common/constants/Ids";
import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";

type LoginModalProperties = {
    onHide: Function;
    show: boolean;
};

export type LoginFormValues = {
    username: string;
    password: string;
};

const defaultLoginFormValues: LoginFormValues = {
    username: "",
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

    const { dirtyFields, errors, isValid } = formState;
    const { password: passwordIsDirty } = dirtyFields;
    const passwordWatchValue = watch("password");

    const onHide = () => {
        if (props.onHide) {
            props.onHide(false);
            reset();
        }
    };

    // const onLogin = async () => {
    //     const values = getValues();
    //     await Login(values);
    //     onHide();
    // };

    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isValid) {
            // await onLogin();
        } else {
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

    console.log(errors);

    return (
        <dialog
            id={Ids.MODAL.LOGIN}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box">
                <h1 className="font-bold text-2xl">
                    {"Enter Credentials Here"}
                </h1>
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
                            className="btn btn-secondary"
                            disabled={disableButton}
                            onClick={onClick}
                        >
                            {"Login"}
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
