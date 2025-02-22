import React from "react";
import { FaTrashCan } from "react-icons/fa6";

type RandomListProperties = {
    readonly buttonId: string;
    readonly callback: (_event: React.MouseEvent<HTMLElement>) => void;
    readonly className?: string;
    readonly items: string[];
    readonly selectedItem?: string | number;
    readonly title: string;
    readonly titleClassName?: string;
};

/**
 * Displays filter options in a vertical menu
 *
 * @param props.buttonId - The id of the button, typically the "trash can" button
 * @param props.callback - The callback that fires when the "trash can" button is pressed, as well as any item
 * @param props.items - The items to list in the "menu"
 * @param props.listClassName - Custom className for the `#main_list` element
 * @param props.selectedItem - The item that the user selected
 * @param props.title - The title of the menu
 * @param props.titleClassName - Custom className for the `#title` element
 * @returns The Random Filter List, which is a list of the available filter options
 */
const RandomFilterList = ({
    buttonId,
    callback,
    className,
    items,
    selectedItem,
    title,
    titleClassName,
}: RandomListProperties): JSX.Element => (
    <ul
        className={`menu menu-vertical bg-base-200 rounded--box w-56 shadow-lg ${
            className ?? ""
        }`}
        id="main_list"
    >
        <li
            className={`menu-title text-primary flex flex-row gap-5 items-center justify-between ${
                titleClassName ?? ""
            }`}
            id="title"
        >
            {title}{" "}
            <button
                className="btn btn-xs btn-ghost btn-outline text-primary hover:text-black hover:border-black hover:outline-black hover:bg-primary"
                id={buttonId}
                onClick={callback}
                title={`Clear ${title}s`}
            >
                <FaTrashCan className="pointer-events-none" size={11} />
            </button>
        </li>
        {items.sort().map((eachItem) => (
            <li key={eachItem}>
                <a
                    data-cancelid={buttonId}
                    className={
                        selectedItem === eachItem
                            ? "pointer-events-none text-opacity-20 text-white bg-gray-500 bg-opacity-50"
                            : ""
                    }
                    id={eachItem}
                    onClick={callback}
                    title={eachItem}
                >
                    {eachItem}
                </a>
            </li>
        ))}
    </ul>
);

export { RandomFilterList as RandomFilterList };
