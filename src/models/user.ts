import { Timestamp } from "firebase/firestore";

interface InfoUser {
    firstName: string | any;
    lastName: string | any;
    age?: number;
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

interface BookMark {
    idComic: string;
    createdAt: Timestamp;
    nameChapter: string;
    idChapter: string;
}

interface Liked {
    idComic: string;
    createdAt: Timestamp;
}

interface UnLiked {
    idComic: string;
    createdAt: Timestamp;
}

interface HistoryGenres {
    idComic: string;
    createdAt: Timestamp;
}

export interface User {
    id?: string;
    providerId: string;
    info: InfoUser;
    histories: {
        viewed: HistoryViewed[];
        bookMark: BookMark[];
        liked: Liked[];
        unLiked: UnLiked[];
        genres: HistoryGenres[];
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface InsertNewUser {
    providerId: string;
    info: InfoUser;
}
