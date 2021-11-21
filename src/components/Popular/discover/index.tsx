import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";

import { ComicType } from "@/models/comic";
import { Item } from "./item";

const colorRating = (index: number): string => {
    switch (index) {
        case 1:
            return "bg-gradient-to-r from-[#ffd749] to-[#FF7A00]";
        case 2:
            return "bg-gradient-to-r from-[#8fffe4] to-[#1D5CFF]";
        case 3:
            return "bg-gradient-to-r from-[#a1ff89] to-[#00BE7A]";

        default:
            return "bg-[#F4F4F4] dark:bg-[#1A1A1A]";
    }
};

interface Props {
    comics: ComicType[];
    className?: string;
    title?: string;
}

export const PopularDiscoverPage = ({ title, className, comics }: Props) => {
    return (
        <div className={className}>
            <Swiper slidesPerView="auto" spaceBetween={30} className="w-full popular">
                {comics.map((comic, index) => (
                    <SwiperSlide key={index}>
                        <Item comic={comic} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
