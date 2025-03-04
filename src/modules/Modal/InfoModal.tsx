import { Ids } from "@/common/constants/Ids";
import React from "react";
import { useForm } from "react-hook-form";

type InfoModalProperties = {
    onHide: Function;
    show: boolean;
};

export const InfoModal = (props: InfoModalProperties) => {
    const onHide = () => {
        if (props.onHide) {
            props.onHide(false);
        }
    };

    React.useEffect(() => {
        if (props.show) {
            const modal = document.getElementById(Ids.MODAL.INFO);
            if (modal !== null) {
                (modal as HTMLDialogElement).showModal();
            }
        }
    }, [props.show]);

    return (
        <dialog
            className="modal modal-bottom sm:modal-middle"
            id={Ids.MODAL.INFO}
        >
            <div className="modal-box">
                <h1 className="text-5xl font-bold flex flex-row justify-center">
                    {"Welcome!"}
                </h1>
                <p className="py-6 text-lg w-full">
                    {
                        "This website will add functionality I feel was always missing from discogs...... a randomizer of sorts! Looking for the next obscure album or gem to uncover? Or maybe just trying to find that next record to play? Don't even know where to start? Introducing deepcuts.\n"
                    }
                </p>
                <span className="font-bold flex flex-row justify-center">
                    {"** IMPORTANT **"}
                </span>
                <p className="mb-6">
                    {
                        "\nTo be able to apply filters, as well as increase your overall rate limit, you "
                    }{" "}
                    <span className="font-bold">{"MUST"}</span>{" "}
                    {
                        "authenticate your account!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! To authenticate, you must have a Discogs account and locate your personal access API token. It is found in the developers settings. I have also put a direct link to where you can find it in the sign up form. Provide the token during sign up then make sure you authenticate through the profile dropdown and you should be good to go! Happy Digging!"
                    }
                </p>
                <div className="modal-action flex flex-row justify-center">
                    <form method="dialog">
                        <button className="btn" onClick={onHide} type="submit">
                            {"Close"}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
