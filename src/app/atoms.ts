import { atom } from "recoil";

import { UserStateType, GenreType, HistoryUser } from "@/models/index";
import { CURRENT_USER, GENRE_STATE, HISTORY_USER } from "@/commons/index";

export const userState = atom<UserStateType | undefined>({
    key: CURRENT_USER,
    default: undefined,
});

export const historyUserState = atom<HistoryUser | undefined>({
    key: HISTORY_USER,
    default: undefined,
});

export const genresState = atom<GenreType[] | undefined>({
    key: GENRE_STATE,
    default: undefined,
});
