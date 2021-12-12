import { Timestamp } from "firebase/firestore";

interface InfoUser {
    firstName: string | any;
    lastName: string | any;
    dob?: string;
    phoneNumber?: string;
    gender?: string;
    email?: string;
    photoURL?: string;
}

interface HistoryViewed {
    idComic: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nameChapter: string;
    idChapter: string;
}

interface ComicWasInteracted {
    idComic: string;
    createdAt: Timestamp;
    isLike: boolean;
    isBookmark: boolean;
}

export interface HistoryUser {
    comicsWasInteracted: ComicWasInteracted[];
    viewed: HistoryViewed[];
}

export interface User {
    id?: string;
    providerId: string;
    info: InfoUser;
    histories: HistoryUser;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface InsertNewUser {
    providerId: string;
    info: InfoUser;
}
