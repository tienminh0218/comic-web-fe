import Link from "next/link";

import { HistoryViewed } from "@/models/user";
import { fromNowDate } from "@/utils/index";

interface Props {
    HistoryViewed: HistoryViewed;
}

export const CardHistory = ({ HistoryViewed }: Props) => {
    const { comic, chapter } = HistoryViewed;
    return (
        <div className="cursor-pointer">
            <Link href={`/title/${HistoryViewed.idComic}`}>
                <a>
                    <div className={`relative pt-150 group z-1`}>
                        <img
                            src={`${comic.images?.thumbnail.url}`}
                            className="absolute top-2 scale-105 w-full h-full rounded-xl opacity-0 object-cover group-hover:opacity-60 group-hover:blur-xl transition-all duration-300"
                            alt=""
                        />
                        <img
                            src={`${comic.images?.thumbnail.url}`}
                            className={`absolute w-full h-full object-cover rounded-xl top-0`}
                            alt=""
                        />
                    </div>
                </a>
            </Link>
            <div>
                <Link href={`/title/${comic.id}`}>
                    <a>
                        <h3 className="truncate font-bold mt-3 text-lg dark:text-white">{comic.name.vnName}</h3>
                    </a>
                </Link>
                <div className="mt-2 text-xs sm:text-sm text-[#6D6D6D] flex justify-between">
                    <Link href={`/title/${HistoryViewed.idComic}/view/${HistoryViewed.idChapter}`}>
                        <a className="sub-color-hover">
                            <span>Chap {chapter.nameChapter}</span>
                        </a>
                    </Link>
                    <span>{fromNowDate(comic.updatedAt!)}</span>
                </div>
            </div>
        </div>
    );
};
