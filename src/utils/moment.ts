import moment from "moment";

export const fromNowDate = (date: string) => {
    moment.updateLocale("en", {
        relativeTime: {
            future: "in %s",
            past: "%s Trước",
            s: "Vài Giây",
            ss: "%d Giây",
            m: "1 Phút",
            mm: "%d Phút",
            h: "1 Giờ",
            hh: "%d Giờ",
            d: "1 Ngày",
            dd: "%d Ngày",
            w: "1 Tuần",
            ww: "%d Tuần",
            M: "1 Tháng",
            MM: "%d Tháng",
            y: "1 Năm",
            yy: "%d Năm",
        },
    });

    return moment(date).fromNow();
};

export const formatVietNamDate = (date: string) => {
    moment.updateLocale("en", {
        months: [
            "Tháng Một",
            "Tháng Hai",
            "Tháng Ba",
            "Tháng Tư",
            "Tháng Năm",
            "Tháng Sáu",
            "Tháng Bảy",
            "Tháng Tám",
            "Tháng Chín",
            "Tháng Mười",
            "Tháng Mười Một",
            "Tháng Mười Hai",
        ],
    });

    return moment(date).format("[Ngày ]DD, MMMM, [Năm ]YYYY");
};
