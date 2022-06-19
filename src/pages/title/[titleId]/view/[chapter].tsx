import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { increment } from "firebase/firestore";
import Head from "next/head";

import { apiClient } from "@/lib/axios/index";
import Footer from "@/components/Layouts/Footer";
import { NavReading, NextAndPrevChap } from "@/components/Layouts/Nav";
import { ComicType, Chapter } from "@/models/index";
import { LoadingScreen, SoonFeature } from "@/components/Common";
import { historyOfComic } from "@/app/selector";
import { comicsHaveReadState } from "@/app/atoms";
import { firestore } from "@/lib/firebase/service";
import { useAuth } from "@/hook/useAuth";
import moment from "moment";

export interface ViewsPageProps {
    comic: ComicType;
    chapter: Chapter;
    nextAndPrev: NextAndPrevChap;
}
interface ParamViewsPageProps extends ParsedUrlQuery {
    titleId: string;
    chapter: string;
}

const ViewsPage = ({ comic, chapter, nextAndPrev }: ViewsPageProps) => {
    const router = useRouter();
    const historyComic = useRecoilValue(historyOfComic(comic.id));
    const [listHistory, setListHistory] = useRecoilState(comicsHaveReadState);
    const { titleId } = router.query as ParamViewsPageProps;
    const { user } = useAuth();

    const handleChangeChap = (url: string) => {
        router.push(`/title/${titleId}/view/${url}`);
    };

    if (router.isFallback) {
        return <LoadingScreen />;
    }

    if (!chapter) {
        router.push("/");
        return <LoadingScreen />;
    }

    useEffect(() => {
        (async () => {
            await apiClient.setGenreForUser(user?.id!, comic.genres);
        })();
    }, [user]);

    useEffect(() => {
        const addToHistory = () => {
            let newList: any = [...listHistory];
            const indexHistory = listHistory.findIndex((v) => v.idComic === comic.id);
            const currentTime = moment().valueOf();

            if (historyComic) {
                const isNewChapterId = listHistory[indexHistory].listChap.includes(chapter.id!);
                /// update
                newList.splice(indexHistory, 1, {
                    ...newList[indexHistory],
                    idChapter: chapter.id!,
                    listChap: !isNewChapterId
                        ? [...newList[indexHistory].listChap, chapter.id!]
                        : newList[indexHistory].listChap,
                    updatedAt: currentTime,
                });
            } else {
                /// add
                newList.push({
                    idComic: comic.id!,
                    idChapter: chapter.id!,
                    listChap: [chapter.id!],
                    createdAt: currentTime,
                    updatedAt: currentTime,
                });
            }
            setListHistory(newList);
            if (user)
                firestore.updateDb("users", user.id, {
                    "histories.viewed": newList,
                });

            // ADD VIEW TO COMIC
            const listChapClone = [...comic.listChapter].reverse();
            const index = listChapClone.findIndex((chap) => chap.idChapter === chapter.id);
            listChapClone[index].views += 1;
            firestore.updateDb("comics", comic.id!, {
                listChapter: listChapClone,
                "interacts.views": increment(1),
            });
        };
        const timeout = setTimeout(addToHistory, 3000);
        return () => clearTimeout(timeout);
    }, [chapter.id]);
    return (
        <>
            <Head>
                <title>{comic.name.vnName + " Chương " + chapter.nameChapter}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavReading
                onChangeChap={handleChangeChap}
                nextAndPrev={nextAndPrev}
                comic={comic}
                idCurrentChapter={chapter.id!}
                titleId={titleId}
            />
            <div className="mx-auto flex flex-col items-center px-2 pb-20 min-h-screen w-full select-none">
                {chapter.images.map((image) => (
                    <LazyLoadImage
                        key={image.nameFile}
                        placeholderSrc="/image-loading.gif"
                        effect="blur"
                        className="obj"
                        src={image.url}
                    />
                ))}
            </div>

            {/* <div className="w-3/5 mx-auto">
                <h3 className="text-color-default font-medium text-3xl">Comments</h3>
                <SoonFeature />
            </div> */}

            <Footer />
        </>
    );
};

export default ViewsPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const comics = await apiClient.getTitles();
    //filter comic has chapter. Flat return all sub-array elements
    const comicFilterChapterId = comics.filter((comic) => comic.listChapter.length > 0);
    return {
        paths: comicFilterChapterId
            .map((comic) =>
                comic.listChapter.map((chapter) => ({
                    params: { titleId: comic.id, chapter: chapter.idChapter },
                }))
            )
            .flat(),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<ViewsPageProps> = async (context: GetStaticPropsContext) => {
    const { titleId, chapter } = context.params as ParamViewsPageProps;
    if (!titleId || !chapter) return { notFound: true };
    const props: ViewsPageProps = await apiClient.getChapterById(titleId, chapter);
    return {
        props,
        revalidate: 5,
    };
};
