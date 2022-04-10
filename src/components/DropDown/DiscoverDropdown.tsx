import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {}

export const DiscoverDropdown = (props) => {
    return (
        <Menu as="div" className="w-[185px] flex-center cursor-pointer mr-4 mb-2 overflow-hidden rounded-full">
            <Menu.Button className="w-full rounded-full inline-flex justify-center outline-none scrollbar bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer select-none dark:text-dark-text-color py-2">
                {props.name}
                <IoIosArrowDown className="w-5 h-5 ml-2 -mr-1 text-black dark:text-white" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-10 w-48 max-h-[500px] mt-2 overflow-auto scrollbar-custom origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 rounded-full">{props.option}</div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
