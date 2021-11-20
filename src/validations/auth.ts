import * as yup from "yup";

export const schemaLogin = yup.object({
    email: yup.string().required("Bạn chưa nhập email"),
    password: yup.string().min(4, "Mật khẩu ít nhất 6 kí tự").required("Bạn chưa nhập mật khẩu"),
});
