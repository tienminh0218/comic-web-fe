import { atom } from "recoil";

import { UserStateType, GenreType } from "@/models/index";
import { CURRENT_USER, GENRE_STATE } from "@/commons/index";

export const userState = atom<UserStateType | undefined>({
    key: CURRENT_USER,
    default: undefined,
});

export const genresState = atom<GenreType[] | undefined>({
    key: GENRE_STATE,
    default: undefined,
});
