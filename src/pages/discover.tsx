import { ChangeEvent, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRecoilValue } from "recoil";
import { IoIosArrowDown } from "react-icons/io";

import { MainLayout } from "@/components/Layouts";
import { ComicType, NextPageWithLayout } from "@/models/index";
import { PopularDiscoverPage } from "@/components/Popular";
import { apiClient } from "@/axios/index";
import ListComic from "@/components/ListComic";
import { genresState } from "@/app/atoms";

export interface DiscoverProps {
    popular: ComicType[];
    lastUpdated: ComicType[];
}
const Discover: NextPageWithLayout<DiscoverProps> = ({ popular, lastUpdated }: DiscoverProps) => {
    const [comics, setComics] = useState<ComicType[]>(lastUpdated);
    const genres = useRecoilValue(genresState);

    const handleFilterGenres = async (e: ChangeEvent<HTMLSelectElement>) => {
        const slug = e.target.value;
        const data = await apiClient.filter<ComicType[]>({ genres: slug });
        setComics(data);
        // console.log(data);
    };

    const handleFilterStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
        const statusName = e.target.value;
        const data = await apiClient.filter<ComicType[]>({ status: +statusName });
        setComics(data);
        // console.log(data);
    };

    const handleFilterUpload = async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "desc") {
            const data = await apiClient.filter<ComicType[]>({ upload: 1 });
            setComics(data);
            // console.log(data);
        } else if (value === "asc") {
            const data = await apiClient.filter<ComicType[]>({ upload: 2 });
            setComics(data);
            // console.log(data);
        }
    };

    return (
        <div className="px-6 mt-40 text-4xl  ">
            <div className=" md:pl-16 2xl:pl-80 w-full pb-16 ">
                <h3 className="text-4xl font-bold dark:text-dark-text-color mb-8">Khám phá</h3>
                <PopularDiscoverPage className="my-16" comics={popular} />
                <div>
                    <ul className="w-[50%] list-none flex justify-between text-base flex-wrap">
                        <li className="relative flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] rounded-full w-[23%] overflow-hidden">
                            <select
                                onChange={handleFilterGenres}
                                className="w-full flex-center outline-none border-none bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer dark:text-white scrollbar text-lg  rounded-full text-center absolute -left-2 font-bold"
                            >
                                {genres &&
                                    genres.map((genre) => (
                                        <option key={genre.id} value={genre.slug}>
                                            {genre.name}
                                        </option>
                                    ))}
                            </select>
                            <IoIosArrowDown className="absolute top-[15px] right-6 text-black text-lg cursor-pointer dark:text-white" />
                        </li>

                        <li className="relative flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] rounded-full w-[27%] overflow-hidden">
                            <select
                                onChange={handleFilterStatus}
                                className="w-full flex-center outline-none border-none bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer dark:text-white scrollbar text-lg  rounded-full text-center absolute -left-2"
                            >
                                <option value={1}>Đang tiến hành</option>
                                <option value={2}>Đã hoàn thành</option>
                                <option value={3}>Tạm ngưng</option>
                            </select>
                            <IoIosArrowDown className="absolute top-[15px] right-6 text-black text-lg cursor-pointer dark:text-white" />
                        </li>
                        <li className="relative flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] rounded-full w-[20%] overflow-hidden">
                            <select
                                onChange={handleFilterUpload}
                                className=" w-full flex-center outline-none border-none bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer dark:text-white scrollbar text-lg p-2 rounded-full text-center relative -left-2"
                            >
                                <option value="desc">Desc</option>
                                <option value="asc">Asc</option>
                            </select>
                            <IoIosArrowDown className="absolute top-[15px] right-5 text-black text-lg cursor-pointer dark:text-white" />
                        </li>
                    </ul>
                </div>
                <ListComic className="mt-8" comics={comics} />
            </div>
        </div>
    );
};

Discover.Layout = MainLayout;

export default Discover;

export const getStaticProps: GetStaticProps<DiscoverProps> = async () => {
    const props = await apiClient.discover<DiscoverProps>();
    return {
        props,
    };
};
