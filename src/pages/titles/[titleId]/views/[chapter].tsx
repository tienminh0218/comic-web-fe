import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { apiClient } from "@/axios/index";
import Footer from "@/components/Layouts/Footer";
import { NavReading, NextAndPrevChap } from "@/components/Layouts/Nav";
import { Chapter } from "@/models/chapter";
import { ComicType } from "@/models/comic";
import { LoadingScreen } from "@/components/Common";

export interface ViewsPageProps {
    comic: ComicType;
    chapter: Chapter;
    nextAndPrev: NextAndPrevChap;
}
interface ParamViewsPageProps extends ParsedUrlQuery {
    titleId: string;
    chapter: string;
}

export default function ViewsPage({ comic, chapter, nextAndPrev }: ViewsPageProps) {
    const router = useRouter();
    const { titleId } = router.query as ParamViewsPageProps;

    const handleChangeChap = (url: string) => {
        router.push(`/titles/${titleId}/views/${url}`);
    };

    if (router.isFallback) {
        return <LoadingScreen />;
    }

    if (!chapter) {
        router.push("/");
        return <LoadingScreen />;
    }

    return (
        <>
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

            <Footer />
        </>
    );
}
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
