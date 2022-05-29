import Head from "next/head";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ComicType, NextPageWithLayout } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { ListComic } from "@/components/ListComic";
import { SearchDropDown } from "@/components/DropDown/SearchDropDown";
import { EmptyList } from "@/components/Common";
import { SEARCH_TYPE } from "@/commons/index";
import { useDebounce } from "@/hook/index";
import { apiClient } from "@/lib/axios";

const Search: NextPageWithLayout = () => {
    const router = useRouter();
    const { author } = router.query;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
    const [comics, setComics] = useState<ComicType[]>();
    const [type, setType] = useState("Tên truyện");
    const [checkAuthor, setcheckAuthor] = useState(true);
    const [selected, setSelected] = useState(author ? SEARCH_TYPE[1] : SEARCH_TYPE[0]);

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                handleSearchInput(debouncedSearchTerm);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );
    useEffect(() => {
        if (author) {
            setType("Tên tác giả");
            handleSearchInput(author);
        }
        return;
    }, [author]);

    const handleSearchOption = (e: { target: { innerText: string } }) => {
        if (!e.target.innerText || e.target.innerText === type) {
            return;
        }
        let data = e.target.innerText;
        setType(data);
    };
    const handleSearchInput = async (e: any) => {
        try {
            if (author && checkAuthor) {
                const data = await apiClient.getTitleByAuthor<ComicType[]>(author as string);
                setComics(data);
                setcheckAuthor(false);
                return;
            }
            const value = e.target.value;
            if (value.length < 3) {
                return;
            }
            if (type === "Tên truyện") {
                const data = await apiClient.getTitleByName<ComicType[]>(value);
                setComics(data);
                return;
            }
            const data = await apiClient.getTitleByAuthor<ComicType[]>(value);
            setComics(data);
            return;
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <>
            <Head>
                <title>Tìm kiếm | MangaZ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="px-6 mt-20 min-h-screen">
                <div className="md:pl-16 2xl:pl-80 w-full mb-16">
                    <div className="w-full">
                        <h3 className="font-bold text-2xl xs:text-4xl dark:text-white mb-10">Tìm kiếm</h3>
                        <div className="flex justify-center w-full">
                            <div className="flex h-[44px] w-[700px] bg-white border-solid border-2 rounded-r-md rounded-l-3xl shadow-none">
                                <AiOutlineSearch className="my-2 mx-3" color="#a4a5a9" size={25} />
                                <input
                                    className="focus:outline-none w-full"
                                    placeholder={`Nhập ${type} tại đây (ít nhất 3 ký tự)`}
                                    onChange={(e: any) => setSearchTerm(e)}
                                    defaultValue={author}
                                ></input>
                                <SearchDropDown
                                    handleSearchOption={handleSearchOption}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        </div>
                        <div className="w-full pt-10">
                            {comics ? <ListComic className="mt-4" comics={comics} /> : <EmptyList />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Search.Layout = MainLayout;

export default Search;
