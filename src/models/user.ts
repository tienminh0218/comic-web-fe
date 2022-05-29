import { Chapter } from "./chapter";
import { ComicType } from "./comic";
import { Timestamp } from "firebase/firestore";

export interface InfoUser {
    firstName: string | any;
    lastName: string | any;
    dob?: string;
    phoneNumber?: string;
    gender?: string;
    email?: string;
    photoURL?: string;
}

export interface HistoryViewed {
    idComic: string;
    idChapter: string;
    listChap: string[];
    createdAt: number;
    updatedAt: number;
    comic: ComicType;
    chapter: Chapter;
}

export interface ComicWasInteracted {
    idComic?: string;
    isLike: boolean;
    isBookmark: boolean;
}

export interface HistoryUser {
    comicsWasInteracted: ComicWasInteracted[];
    viewed: HistoryViewed[];
}

export interface GenreUser {
    name: string;
    amount: number;
}

export interface User {
    id?: string;
    providerId: string;
    info: InfoUser;
    histories: HistoryUser;
    genres: GenreUser;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface InsertNewUser {
    providerId: string;
    info: InfoUser;
}
export interface updateUser {
    firstName: string | any;
    lastName: string | any;
    gender: string;
    phoneNumber: string;
    dob: string;
}
