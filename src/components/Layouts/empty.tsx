import Head from "next/head";

import { LayoutProps } from "@/models/index";

export const Empty = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title || "MangaZ"}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            {children}
        </>
    );
};
