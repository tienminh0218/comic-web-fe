import Head from "next/head";
import { useEffect, useState } from "react";

import { NextPageWithLayout, ComicType } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { ListComic } from "@/components/ListComic";
import { withAuth } from "@/hoc/index";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/hook/index";

const Bookmark: NextPageWithLayout = () => {
    const { user } = useAuth();
    const [comics, setComics] = useState<ComicType[]>([]);

    useEffect(() => {
        (async () => {
            const comics = await apiClient.getListBookmark(user?.id!);
            setComics(comics);
        })();
    }, []);
    console.log("first", comics);
    return (
        <>
            <Head>
                <title>Tìm kiếm | MangaZ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="px-6 mt-20 min-h-screen">
                <div className=" md:pl-16 2xl:pl-80 w-full mb-16">
                    {comics && <ListComic title="Truyện theo dõi" comics={comics} />}
                </div>
            </div>
        </>
    );
};

export default withAuth(Bookmark, MainLayout);
