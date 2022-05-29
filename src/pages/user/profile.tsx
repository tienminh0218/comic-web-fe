import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { useForm } from "react-hook-form";

import { NextPageWithLayout } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { withAuth } from "@/hoc/index";
import { useAuth } from "@/hook/index";
import { apiClient } from "@/lib/axios";
import { User } from "@/models/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUpdateProfile } from "@/validations/profile";
import { formatVietNamDate } from "@/utils/moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import moment from "moment";

let initialValue = {
    dob: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
};

const Profile: NextPageWithLayout = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<User>();
    const [isTabUpdate, setIsTabUpdate] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        reset,
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schemaUpdateProfile),
    });

    const onSubmit = async (payload) => {
        try {
            if (JSON.stringify(initialValue) === JSON.stringify(payload)) {
                toast.error("Thông tin không thay đổi!");
                return;
            }
            const newProfile = {
                ...profile?.info,
                ...payload,
            };
            const message = await apiClient.updateUserProfile(user?.id as string, newProfile);
            toast(message);
            setIsTabUpdate(false);
            setProfile(undefined);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!profile) {
            (async () => {
                const userProfile = await apiClient.getUserProfile(user?.id!);
                setProfile(userProfile);
                initialValue = {
                    firstName: userProfile.info?.firstName || "",
                    lastName: userProfile.info?.lastName || "",
                    gender: userProfile.info?.gender || "",
                    phoneNumber: userProfile.info?.phoneNumber || "",
                    dob: userProfile.info?.dob || "",
                };
                reset(initialValue);
            })();
        }
    }, [profile]);

    const handleOnClickChangeUIProfile = (status: string) => {
        if (status === "profile") {
            setIsTabUpdate(false);
            return;
        }
        setIsTabUpdate(true);
        return;
    };

    const handleSetDefaultValue = () => {
        reset(initialValue);
    };

    return (
        <div className="px-6 mt-20 md:mt-40 min-h-screen">
            <div className="md:pl-16 2xl:pl-80 flex flex-wrap-reverse xl:flex-nowrap ">
                <div className="w-full mb-16 p-3 border-2 rounded-lg xl:rounded-l-lg xl:rounded-tr-none dark:border-white">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white pb-5">
                        <HiOutlineUser size={40} />
                        <span className="tracking-wide text-xl">Thông tin</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-gray-700 dark:text-white">
                            <div className="grid min-h-[540px]  text-lg md:text-lg leading-10 gap-2">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Tên</div>
                                    {isTabUpdate ? (
                                        <div>
                                            <input
                                                className="input"
                                                {...register("firstName")}
                                                placeholder="Nhập tên tại đây"
                                            />
                                            {(errors?.firstName?.type === "min" ||
                                                errors?.firstName?.type === "max" ||
                                                errors?.firstName?.type === "required") && (
                                                <p className="text-red-300">{errors?.firstName?.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 truncate">
                                            {profile?.info?.firstName || "Chưa cung cấp"}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Họ / Tên đệm</div>
                                    {isTabUpdate ? (
                                        <>
                                            <input
                                                className="input"
                                                {...register("lastName")}
                                                placeholder={
                                                    profile?.info?.lastName
                                                        ? `${profile?.info?.lastName}`
                                                        : `Nhập họ / tên đệm tại đây`
                                                }
                                            />
                                            {(errors?.lastName?.type === "min" ||
                                                errors?.lastName?.type === "max" ||
                                                errors?.lastName?.type === "required") && (
                                                <p>{errors?.lastName?.message}</p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="px-4 py-2 truncate">
                                            {profile?.info?.lastName || "Chưa cung cấp"}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Giới tính</div>
                                    {isTabUpdate ? (
                                        <select className="input" {...register("gender")}>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    ) : (
                                        <div className="px-4 py-2 truncate">
                                            {profile?.info?.gender || "Chưa cung cấp"}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Số điện thoại</div>
                                    {isTabUpdate ? (
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            maxLength={10}
                                            minLength={9}
                                            className="input"
                                            {...register("phoneNumber")}
                                            placeholder={
                                                profile?.info?.phoneNumber
                                                    ? `${profile?.info?.phoneNumber}`
                                                    : `Nhập số điện thoại tại đây`
                                            }
                                        />
                                    ) : (
                                        <div className="px-4 py-2 truncate">
                                            {profile?.info?.phoneNumber || "Chưa cung cấp"}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Ngày sinh (DD/MM/YYYY)</div>
                                    {isTabUpdate ? (
                                        <input
                                            type="date"
                                            className="input"
                                            max="2021-01-01"
                                            min="1900-01-01"
                                            {...register("dob")}
                                            placeholder={
                                                profile?.info?.dob
                                                    ? `${profile?.info?.dob}`
                                                    : `Nhập ngày sinh tại đây`
                                            }
                                        />
                                    ) : (
                                        <div className="px-4 py-2 truncate">
                                            {profile?.info?.dob
                                                ? moment(profile?.info?.dob).format("MM/DD/YYYY")
                                                : "Chưa cung cấp"}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email</div>
                                    <div className="px-4 py-2 truncate">
                                        <a
                                            className="sub-color "
                                            href={profile?.info?.email ? `mailto:${profile?.info?.email}` : ""}
                                        >
                                            {profile?.info?.email || "Chưa cung cấp"}
                                        </a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Đăng nhập bằng</div>
                                    <div className="px-4 py-2 truncate">
                                        {(profile?.providerId === "firebase" ? (
                                            <img
                                                src="/logo.svg"
                                                alt=""
                                                className="dark:bg-white dark:rounded-md"
                                            />
                                        ) : (
                                            profile?.providerId
                                        )) || "Chưa cung cấp"}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Ngày tham gia</div>
                                    <div className="px-4 py-2 truncate">
                                        {(profile?.createdAt &&
                                            formatVietNamDate(profile?.createdAt.toString())) ||
                                            "Chưa cung cấp"}
                                    </div>
                                </div>
                                {isTabUpdate && (
                                    <div className="flex justify-center items-center mt-8">
                                        <button
                                            type="button"
                                            onClick={handleSetDefaultValue}
                                            className="text-base flex-center mr-2 mb-2 px-3 py-1 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default"
                                        >
                                            Đặt lại
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-base flex-center mr-2 mb-2 px-3 py-1 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default"
                                        >
                                            {isSubmitting && (
                                                <AiOutlineLoading3Quarters className="animate-spin" />
                                            )}
                                            Cập nhật
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="grid row-span-2 w-full mb-8 border-2 rounded-lg text-lg overflow-hidden xl:w-1/4 xl:border-l-0 xl:rounded-l-none xl:h-36 ">
                    <div
                        className={`py-2 flex-center border-b-2 border-white ${
                            !isTabUpdate
                                ? "bg-gray-200 font-semibold"
                                : "bg-white dark:bg-black dark:text-white md:hover:bg-transparent"
                        }`}
                        onClick={() => handleOnClickChangeUIProfile("profile")}
                    >
                        Thông tin
                    </div>
                    <div
                        className={`py-2 flex-center ${
                            isTabUpdate
                                ? "bg-gray-200 font-semibold"
                                : "bg-white dark:bg-black dark:text-white md:hover:bg-transparent"
                        }`}
                        onClick={() => handleOnClickChangeUIProfile("update")}
                    >
                        Chỉnh sửa thông tin
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Profile, MainLayout);
