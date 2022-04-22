import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineCheck, HiSelector } from "react-icons/hi";

import { SEARCH_TYPE } from "@/commons/constants";

interface Props {
    handleSearchOption: (e: {
        target: {
            innerText: string;
        };
    }) => void;
    selected: {
        type: string;
    };
    setSelected: Dispatch<
        SetStateAction<{
            type: string;
        }>
    >;
}

export const SearchDropDown = ({ handleSearchOption, selected, setSelected }: Props) => {
    return (
        <div className="max-w-72 min-w-[123px] h-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative h-full">
                    <Listbox.Button className="relative w-full h-full border-l-2 rounded-r-md pl-3 pr-10 text-left bg-white cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="truncate text-base">{selected.type}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            onClick={(e) => handleSearchOption(e)}
                            className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {SEARCH_TYPE.map((type, typeIdx) => (
                                <Listbox.Option
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4  ${
                                            active ? "bg-gray-100" : "text-gray-900"
                                        }`
                                    }
                                    value={type}
                                    key={typeIdx}
                                >
                                    {({ selected }) => (
                                        <div>
                                            <span
                                                className={`block truncate ${
                                                    selected ? "font-medium" : "font-normal"
                                                }`}
                                            >
                                                {type.type}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <HiOutlineCheck className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};
