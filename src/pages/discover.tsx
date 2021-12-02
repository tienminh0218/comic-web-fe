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
    const [stringStatus, setStringStatus] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const genres = useRecoilValue(genresState);

    const handleFilterGenres = async (e: ChangeEvent<HTMLSelectElement>) => {
        const slug = e.target.value;
        const data = await apiClient.filter<ComicType[]>({ genres: slug });
        setGenre(slug);
        setComics(data);
    };

    const handleFilterStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
        const statusName = e.target.value;
        const data = await apiClient.filter<ComicType[]>({ genres: genre, status: +statusName });
        setStringStatus(statusName);
        setComics(data);
    };

    const handleFilterUpload = async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "desc") {
            const data = await apiClient.filter<ComicType[]>({ genres: genre, status: +stringStatus, upload: 1 });
            setComics(data);
        } else if (value === "asc") {
            const data = await apiClient.filter<ComicType[]>({ genres: genre, status: +stringStatus, upload: 2 });
            setComics(data);
        }
    };

    return (
        <div className="px-6 mt-20 text-4xl  ">
            <div className=" md:pl-16 2xl:pl-80 w-full pb-16">
                <h3 className="text-4xl font-bold dark:text-dark-text-color mb-8 ">Khám phá</h3>
                <PopularDiscoverPage className="mb-16" comics={popular} />
                <div className="flex flex-wrap justify-start w-full text-lg">
                    <div className="w-[160px]  bg-[#f4f4f4] dark:bg-[#1A1A1A] flex-center rounded-full cursor-pointer mr-4 mb-2">
                        <select
                            onChange={handleFilterGenres}
                            className="outline-none scrollbar flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer select-none dark:text-dark-text-color w-[66%] py-2"
                        >
                            {genres &&
                                genres.map((genre) => (
                                    <option key={genre.id} value={genre.slug}>
                                        {genre.name}
                                    </option>
                                ))}
                        </select>
                        <IoIosArrowDown className="text-black dark:text-white" />
                    </div>
                    <div className="w-[185px]  bg-[#f4f4f4] dark:bg-[#1A1A1A] flex-center rounded-full cursor-pointer mr-4 mb-2">
                        <select
                            onChange={handleFilterStatus}
                            className="outline-none scrollbar flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer select-none dark:text-dark-text-color w-[70%] py-2"
                        >
                            <option>Trạng thái</option>
                            <option value={1}>Đang tiến hành</option>
                            <option value={2}>Đã hoàn thành</option>
                            <option value={3}>Tạm ngưng</option>
                        </select>
                        <IoIosArrowDown className="text-black dark:text-white" />
                    </div>
                    <div className="w-[185px]  bg-[#f4f4f4] dark:bg-[#1A1A1A] flex-center rounded-full cursor-pointer mb-2">
                        <select
                            onChange={handleFilterUpload}
                            className="outline-none scrollbar flex-center bg-[#f4f4f4] dark:bg-[#1A1A1A] cursor-pointer select-none dark:text-dark-text-color w-[70%] py-2"
                        >
                            <option>Ngày cập nhật</option>
                            <option value="desc">Giảm dần</option>
                            <option value="asc">Tăng dần</option>
                        </select>
                        <IoIosArrowDown className="text-black dark:text-white" />
                    </div>
                    <p className="absolute top-[355px] right-8 flex-center text-base text-[#a09b9b]">
                        {lastUpdated.length} series
                    </p>
                </div>
                <ListComic className="mt-4" comics={comics} totalCol={5} />
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
