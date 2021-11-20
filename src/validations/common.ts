import * as yup from "yup";

export const schemaParams = yup.object().shape({
    genres: yup.string().required("Bạn chưa nhập email"),
    status: yup.string().min(4, "Mật khẩu ít nhất 6 kí tự").required("Bạn chưa nhập mật khẩu"),
    upload: yup.string().min(4, "Mật khẩu ít nhất 6 kí tự").required("Bạn chưa nhập mật khẩu"),
});
