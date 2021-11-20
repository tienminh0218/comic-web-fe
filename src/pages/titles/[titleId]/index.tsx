import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AnimatedShowMore from "react-animated-show-more";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { NextPageWithLayout } from "@/models/common";
import { MainLayout } from "@/components/Layouts";
import { apiClient } from "@/axios/index";
import { ComicType } from "@/models/comic";
import { LoadingScreen } from "@/components/Common";
import Genres from "@/components/Genres";

interface DetailPageProps {
    comic: ComicType;
}

const TitlePage: NextPageWithLayout<DetailPageProps> = ({ comic }) => {
    const [like, setLike] = useState(<AiOutlineLike />);
    const [dislike, setDislike] = useState(<AiOutlineDislike />);
    const [bookmark, setBookmark] = useState(<BsBookmark />);
    const router = useRouter();

    if (router.isFallback) {
        return <LoadingScreen />;
    }

    if (!comic) {
        router.push("/");
        return <LoadingScreen />;
    }

    return (
        <>
            <div className="min-w-[350px] px-5">
                <div className="flex flex-wrap-reverse w-full md:flex-nowrap md:justify-between pt-12 md:pt-24 md:pl-16 md:pb-8 2xl:mb-0 2xl:pl-80">
                    <div
                        key={comic.id}
                        className=" w-full h-max relative z-1 -mt-12 md:flex md:flex-col md:items-start md:mt-0 "
                    >
                        <p className="mb-1 text-2xl text-[#989898] font-semibold">{comic.name.orgName}</p>
                        <p className="text-5xl font-bold pb-4 dark:text-dark-text-color transition-all ">
                            {comic.name.vnName}
                        </p>
                        <div className="flex flex-wrap text-xs pb-5">
                            <Genres genres={comic.genres} />
                        </div>
                        <div className="h-max">
                            <AnimatedShowMore
                                shadowColor="#8a8a8a"
                                height={90}
                                toggle={({ isOpen }) =>
                                    isOpen ? (
                                        <p className="text-lg mb-5 font-semibold hover:underline dark:text-dark-text-color transition-all ">
                                            See less!!!
                                        </p>
                                    ) : (
                                        <p className="text-lg mb-5 font-semibold hover:underline dark:text-dark-text-color transition-all ">
                                            See more!!!
                                        </p>
                                    )
                                }
                                speed={200}
                            >
                                <p className="text-lg leading-8 dark:text-dark-text-color transition-all ">
                                    {comic.describe}
                                </p>
                            </AnimatedShowMore>
                        </div>
                        <div className="h-auto flex flex-col w-full bg-dark-text-color p-8 gap-4 rounded-lg dark:bg-[#1A1A1A] dark:text-[#c9d1d9] transition-all 2xl:mb-8 ">
                            <div className="flex flex-col gap-2 md:flex-row">
                                <p className="font-bold text-base ">Tác giả / Họa sĩ:</p>
                                <span>
                                    <a
                                        className="text-base underline-custom hover:underline hover:cursor-pointer dark:text-[#fff]"
                                        href="https://catmanga.org/discover?authors=Iori%20Asaga"
                                    >
                                        {comic.author}
                                    </a>
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <p className="font-bold text-base ">Lượt xem:</p>
                                <p className="font-semibold text-base dark:text-[#fff]">
                                    {comic.interacts?.views || 0}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <p className="font-bold text-base ">Trạng thái:</p>
                                <p className="font-semibold text-base dark:text-[#fff]">{comic.status}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full h-max relative min-w-min md:flex md:justify-end md:w-3/5 ">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f400] via-[#f4f4f400] to-dark-text-color dark:to-[#000000] md:hidden"></div>
                        <img
                            className="rounded-lg h-96 w-full object-cover object-top md:flex md:h-max md:w-8/12"
                            src={comic.images?.thumbnail.url}
                            alt={comic.name.vnName}
                        />
                    </div>
                </div>
                <div className=" flex flex-wrap-reverse pb-16 md:justify-between md:pl-16 2xl:pl-80 ">
                    <div className="w-full justify-between shadow-base overflow-y-auto h-108 border border-[#d8dee4] dark:border-[#30363d] rounded-2xl scroll-custom ">
                        <div className="flex justify-between py-3 pr-4 border-b border-[#d8dee4] dark:border-[#30363d]  bg-dark-text-color text-sm font-semibold dark:bg-[#1A1A1A] dark:text-[#c9d1d9] ">
                            <span className="min-w-[9rem] w-1/2 ml-4">Danh sách chương</span>
                            <div className="flex justify-between w-1/2 space-x-2">
                                <span className="">Ngày cập nhật</span>
                                <span className="">Lượt xem</span>
                            </div>
                        </div>
                        <>
                            {comic && comic.listChapter.length !== 0 ? (
                                comic.listChapter.map((chapter) => (
                                    <Link
                                        key={chapter.idChapter}
                                        href={{
                                            pathname: "/titles/[titleId]/views/[chapter]",
                                            query: {
                                                titleId: comic.id,
                                                chapter: chapter.idChapter,
                                            },
                                        }}
                                    >
                                        <a>
                                            <div className="flex justify-between pr-4 py-2 border-b border-[#d8dee4] dark:border-[#30363d] text-sm font-normal text-gray-500  dark:text-dark-text-color">
                                                <span className="min-w-[9rem] w-1/2  truncate hover:text-black dark:hover:text-pink-500 hover:font-semibold cursor-pointer ml-4">
                                                    Chương {chapter.name}
                                                </span>
                                                <div className="flex justify-between w-1/2 space-x-2">
                                                    <span className="">{chapter.createdAt}</span>
                                                    <span className="">~8 tỷ</span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center pr-4 py-2 border-b border-[#d8dee4] dark:border-[#30363d] text-sm font-normal text-gray-500  dark:text-dark-text-color">
                                    <span className="ml-4 font-semibold">Chưa có chap nào</span>
                                </div>
                            )}
                        </>
                    </div>

                    <div className="flex flex-col w-full relative min-w-min md:justify-start gap-2 md:flex-row md:items-center my-8">
                        <div className=" flex w-content flex-wrap  md:w-8/12 text-lg dark:text-dark-text-color">
                            <div
                                className="inline-block mr-2 mb-2 p-1 w-28 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] hover:bg-gray-200 hover:cursor-pointer dark:bg-[#1A1A1A] "
                                onClick={() => setLike(<AiFillLike />)}
                            >
                                <span className="flex items-center space-x-1 justify-center w-full">
                                    {like}

                                    <p className="">{comic.interacts?.like || 0}</p>
                                </span>
                            </div>
                            <div
                                className="inline-block mr-2 mb-2 p-1 w-28 rounded-md tracking-wider font-semibold border-solid  border border-[#d8dee4] dark:border-[#30363d] hover:bg-gray-200 hover:cursor-pointer dark:bg-[#1A1A1A]"
                                onClick={() => setDislike(<AiFillDislike />)}
                            >
                                <span className="flex items-center space-x-1 justify-center w-full">
                                    {dislike}
                                    <p className="">{comic.interacts?.unlike || 0}</p>
                                </span>
                            </div>
                            <div
                                className="inline-block mr-2 mb-2 p-1  w-28 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] hover:bg-gray-200 hover:cursor-pointer dark:bg-[#1A1A1A]"
                                onClick={() => setBookmark(<BsBookmarkFill />)}
                            >
                                <span className="flex items-center space-x-1 justify-center w-full">
                                    {bookmark}
                                    <p className="">{comic.interacts?.bookMark || 0}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

TitlePage.Layout = MainLayout;

export default TitlePage;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await apiClient.getTitles();
    return {
        paths: data.map((comic) => ({ params: { titleId: comic.id } })),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<DetailPageProps> = async (context: GetStaticPropsContext) => {
    const titleId = context.params?.titleId as string;
    if (!titleId) return { notFound: true };
    const props = await apiClient.getTitleById<DetailPageProps>(titleId);
    return {
        props,
        revalidate: 5,
    };
};
