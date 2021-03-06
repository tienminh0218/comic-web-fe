import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { useRecoilValue } from "recoil";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Head from "next/head";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

import { MainLayout } from "@/components/Layouts";
import { ComicType, NextPageWithLayout } from "@/models/index";
import { PopularDiscoverPage } from "@/components/Popular";
import { apiClient } from "@/lib/axios";
import { ListComic } from "@/components/ListComic";
import { LoadingScroll } from "@/components/Common";
import { genresState } from "@/app/atoms";
import { DATE_UPLOAD } from "@/commons/index";
import { DiscoverDropdown } from "@/components/DropDown";

export interface DiscoverProps {
    popular: ComicType[];
    lastUpdated: ComicType[];
}
const Discover: NextPageWithLayout<DiscoverProps> = ({ popular, lastUpdated }: DiscoverProps) => {
    const router = useRouter();
    const { filter } = router.query;
    const [comics, setComics] = useState<ComicType[]>(lastUpdated);
    const [stringStatus, setStringStatus] = useState<string>("");
    const [stringStatusName, setStringStatusName] = useState<string>("Trạng thái");
    const [genre, setGenre] = useState<string>("");
    const [genreName, setGenreName] = useState<string>("Thể loại");
    const [dateUpload, setDateUpload] = useState("Ngày cập nhật");
    const genres = useRecoilValue(genresState);
    const hasMore = useRef(true);

    const handleFilterGenres = async (genre: any) => {
        try {
            hasMore.current = false;
            const data = await apiClient.filter<ComicType[]>({ genres: genre.slug });
            setGenre(genre.slug);
            setGenreName(genre.name);
            setComics(data);
        } catch (error) {
            console.log({ error });
        }
    };

    const handleFilterStatus = async (status: any) => {
        try {
            hasMore.current = false;
            const data = await apiClient.filter<ComicType[]>({ genres: genre, status: +status });
            setStringStatus(status);
            setStringStatusName(status === 1 ? "Đang tiến hành" : status === 2 ? "Đã hoàn thành" : "Tạm ngưng");
            setComics(data);
        } catch (error) {
            console.log({ error });
        }
    };

    const handleFilterUpload = async (upload: string) => {
        try {
            hasMore.current = false;
            const data = await apiClient.filter<ComicType[]>({
                genres: genre,
                status: +stringStatus,
                upload: DATE_UPLOAD[upload],
            });
            setComics(data);
            setDateUpload(upload === "desc" ? "Mới nhất" : "Cũ nhất");
        } catch (error) {
            console.log({ error });
        }
    };

    const fetchData = async () => {
        try {
            const lastId = comics[comics.length - 1].id;
            const data = await apiClient.discoverGetMoreComic<ComicType[]>(lastId!);
            if (data.length === 0) hasMore.current = false;
            setComics([...comics, ...data]);
        } catch (error: any) {
            toast.info(error.message);
        }
    };
    useEffect(() => {
        (async () => {
            if (filter) {
                hasMore.current = false;
                const data = await apiClient.filter<ComicType[]>({ genres: filter });
                setGenre(filter as string);
                setComics(data);
            }
        })();
    }, [filter]);

    return (
        <>
            <Head>
                <title>Khám Phá | MangaZ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <meta property="og:image" content="url image" /> */}
            </Head>
            <div className="px-6 mt-20 text-4xl">
                <div className=" md:pl-16 2xl:pl-80 w-full pb-16">
                    <h3 className="text-4xl font-bold dark:text-dark-text-color mb-8 ">Khám phá</h3>
                    <PopularDiscoverPage className="mb-16" comics={popular} />

                    <div className="flex flex-wrap justify-start w-full text-lg">
                        <DiscoverDropdown
                            name={genreName}
                            option={
                                <>
                                    {genres &&
                                        genres.map((genre) => (
                                            <Menu.Item key={genre.id}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => handleFilterGenres(genre)}
                                                        className={`${
                                                            active ? "font-bold" : "text-gray-900"
                                                        } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                                    >
                                                        {genre.name}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                </>
                            }
                        />
                        <DiscoverDropdown
                            name={stringStatusName}
                            option={
                                <>
                                    <Menu.Item key={"Ongoing"}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFilterStatus(1)}
                                                className={`${
                                                    active ? "font-bold" : "text-gray-900"
                                                } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                            >
                                                {"Đang tiến hành"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item key={"Complete"}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFilterStatus(2)}
                                                className={`${
                                                    active ? "font-bold" : "text-gray-900"
                                                } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                            >
                                                {"Đã hoàn thành"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item key={"Drop"}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFilterStatus(3)}
                                                className={`${
                                                    active ? "font-bold" : "text-gray-900"
                                                } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                            >
                                                {"Tạm ngưng"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            }
                        />

                        <DiscoverDropdown
                            name={dateUpload}
                            option={
                                <>
                                    <Menu.Item key={"New"}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFilterUpload("desc")}
                                                className={`${
                                                    active ? "font-bold" : "text-gray-900"
                                                } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                            >
                                                {"Mới nhất"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item key="Old">
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleFilterUpload("asc")}
                                                className={`${
                                                    active ? "font-bold" : "text-gray-900"
                                                } relative group flex rounded-md items-center w-full px-2 py-2 text-base`}
                                            >
                                                {"Cũ nhất"}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            }
                        />
                        <p className="absolute top-[355px] right-8 flex-center text-base text-[#a09b9b]">
                            {comics.length} series
                        </p>
                    </div>
                    <div className="w-full">
                        <InfiniteScroll
                            dataLength={comics.length}
                            next={fetchData}
                            hasMore={hasMore.current}
                            loader={<LoadingScroll />}
                            endMessage={<></>}
                        >
                            <ListComic className="mt-4" comics={comics} />
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
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
