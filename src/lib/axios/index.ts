import queryString from "query-string";

import { HistoryViewed, updateUser, User } from "@/models/user";
import { ComicType, FilterParams } from "@/models/index";
import axios from "./config";

export const apiClient = {
    async homePage<T>(): Promise<T> {
        return await axios.get("/home");
    },

    async getTitles(): Promise<ComicType[]> {
        return await axios.get("/titles");
    },

    async getTitleById<T>(id: string | string[]): Promise<T> {
        return await axios.get(`/titles/${id}`);
    },

    async getTitleByName<T>(name: string): Promise<T> {
        return await axios.get(`/search/title/${name}`);
    },

    async getTitleByAuthor<T>(authorName: string): Promise<T> {
        return await axios.get(`/search/author/${authorName}`);
    },

    async getChapterById<T>(idTitle: string, idChap: string): Promise<T> {
        return await axios.get(`/titles/${idTitle}/view/${idChap}`);
    },

    async discover<T>(): Promise<T> {
        return await axios.get(`/discover`);
    },

    async discoverGetMoreComic<T>(id: string): Promise<T> {
        return await axios.get(`/discover/getMore?nextPage=${id}`);
    },

    async filter<T>(params: FilterParams): Promise<T> {
        const paramsString = queryString.stringify(params);
        return await axios.get(`/discover/filter?${paramsString}`);
    },

    async getListRecommend(userId: string): Promise<ComicType[]> {
        return await axios.get(`/users/recommend/${userId}`);
    },

    async getListBookmark(userId: string): Promise<ComicType[]> {
        return await axios.get(`/users/bookmark/${userId}`);
    },

    async getUserProfile(userId: string): Promise<User> {
        return await axios.get(`/users/profile/${userId}`);
    },

    async updateUserProfile(userId: string, data: updateUser): Promise<String> {
        return await axios.put(`/users/profile/update/${userId}`, data);
    },

    async setGenreForUser(userId: string, data: string[]): Promise<String> {
        return await axios.put(`/users/genre/${userId}`, data);
    },

    async getListHistory(userId: string): Promise<HistoryViewed[]> {
        return axios.get(`/users/history/${userId}`);
    },
};
