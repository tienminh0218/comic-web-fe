import { useRecoilValue } from "recoil";
import Head from "next/head";

import { comicsHaveReadState } from "@/app/atoms";
import { NextPageWithLayout } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { ListHistory } from "@/components/ListComic";

const History: NextPageWithLayout = () => {
    const comics = useRecoilValue(comicsHaveReadState);

    return (
        <>
            <Head>
                <title>Lịch sử | MangaZ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="px-6 mt-20 min-h-screen">
                <div className=" md:pl-16 2xl:pl-80 w-full mb-16">
                    <ListHistory title="Lịch sử" comics={comics} />
                </div>
            </div>
        </>
    );
};

History.Layout = MainLayout;

export default History;
