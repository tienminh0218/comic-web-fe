import Head from "next/head";
import { async } from "@firebase/util";

import { HistoryViewed, NextPageWithLayout } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { ListHistory } from "@/components/ListComic";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/hook";
import { withAuth } from "@/hoc";

const History: NextPageWithLayout = () => {
    const [comics, setComics] = useState<HistoryViewed[]>();
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            setComics(await apiClient.getListHistory(user?.id as string));
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Lịch sử | MangaZ</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="px-6 mt-20 min-h-screen">
                <div className=" md:pl-16 2xl:pl-80 w-full mb-16">
                    {comics && <ListHistory title="Lịch sử" comics={comics as HistoryViewed[]} />}
                </div>
            </div>
        </>
    );
};

export default withAuth(History, MainLayout);
