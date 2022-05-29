import * as yup from "yup";

export const schemaUpdateProfile = yup.object({
    lastName: yup
        .string()
        .min(2, "Họ ít nhất 2 kí tự")
        .max(20, "Họ ít hơn 20 kí tự")
        .required("Bạn chưa nhập họ "),
    firstName: yup
        .string()
        .min(2, "Tên ít nhất 2 kí tự")
        .max(20, "Tên ít hơn 20 kí tự")
        .required("Bạn chưa nhập tên"),
});
