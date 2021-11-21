import Link from "next/link";

import Card from "@/components/Card";
import { ComicType } from "@/models/comic";

interface Props {
    isNew?: boolean;
    comics: ComicType[];
    className?: string;
    title?: string;
    totalCol?: number;
}

const ListComic = ({ isNew, comics, title, className, totalCol }: Props) => {
    return (
        <div className={`${className} w-full`}>
            {title && <h3 className="font-bold text-2xl xs:text-4xl dark:text-white mb-10">{title}</h3>}
            <div
                className={`${
                    isNew
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                        : `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`
                } grid gap-6 md:gap-y-10`}
            >
                {comics.map((comic) => (
                    <Link key={comic.id} href={`/titles/${comic.id}`}>
                        <a>
                            <Card isLastUpdate={isNew} comic={comic} />
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListComic;
