import { ComicType } from "@/models/comic";
import Image from "next/image";

interface Props {
    isLastUpdate?: boolean;
    comic: ComicType;
}

const Card = ({ isLastUpdate, comic }: Props) => {
    return (
        <div className="cursor-pointer">
            <div className={`${isLastUpdate ? "h-56" : "pt-150 "} relative group z-1`}>
                <img
                    src={`${comic.images?.thumbnail.url}`}
                    className="absolute top-2 scale-105 w-full h-full rounded-xl opacity-0 object-cover group-hover:opacity-60 group-hover:blur-xl transition-all duration-300"
                    alt=""
                />
                <img
                    src={`${comic.images?.thumbnail.url}`}
                    className={`${
                        isLastUpdate && "object-top"
                    } absolute w-full h-full object-cover rounded-xl top-0`}
                    alt=""
                />
            </div>
            <div>
                <h3 className="truncate font-bold mt-3 text-lg dark:text-white">{comic.name.vnName}</h3>
                <div className="mt-2 text-sm text-[#6D6D6D] flex justify-between">
                    <span>Chap 1</span>
                    <span>3-10-2077</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
