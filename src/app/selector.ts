import { selectorFamily } from "recoil";

import { interactComicsState, comicsHaveReadState } from "./atoms";
import { COMICS_INTERACTED } from "@/commons/recoilKey";
import { HistoryViewed, ComicWasInteracted } from "@/models/index";

export const interactOfComic = selectorFamily({
    key: COMICS_INTERACTED,
    get:
        (comicId: string) =>
        ({ get }) => {
            const DEFAULT_VALUE = {
                isLike: false,
                isBookmark: false,
            };
            const comicsBookmark = get(interactComicsState);
            const result = comicsBookmark.find((item) => item.idComic === comicId);
            return result ? result : DEFAULT_VALUE;
        },
});
